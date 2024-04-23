import localforage from "localforage";
import { adjustChildOrder, generateId } from "./general";
import { getProjects, isProjectExisted } from "./projects";

// Tasks
function cleanTaskData({ ...data }) {
  if (data.id) {
    throw new Error("Task's id cannot be modified directly.");
  }

  if (data.childOrder) {
    throw new Error("Task's child order cannot be modified directly.");
  }

  if (data.name) {
    data.name = data.name.trim().replaceAll(/ +/g, " ");
  }

  if (data.description) {
    data.description = data.description
      .trim()
      .replaceAll(/[^\S\n]+/g, " ")
      .replaceAll(/[\s]{2,}/g, "\n");
  }

  if (typeof data.isCompleted === "string") {
    data.isCompleted = data.isCompleted === "true";
  }

  if (typeof data.dueDate === "string") {
    if (data.dueDate === "null") {
      data.dueDate = null;
    } else {
      data.dueDate = new Date(data.dueDate);
      data.dueDate.setHours(0, 0, 0, 0);
    }
  }

  if (typeof data.priority === "string") {
    data.priority = Number(data.priority);
  }

  if (typeof data.labelIds === "string") {
    data.labelIds = data.labelIds.length ? data.labelIds.split(",") : [];
  }

  if (data["labelIds[0]"]) {
    const entries = Object.entries(data).filter((entry) =>
      entry[0].startsWith("labelIds["),
    );
    data.labelIds = entries.map((entry) => entry[1]);
    entries.forEach((entry) => delete data[entry[0]]);
  }

  if (data.addedAt) {
    throw new Error("Task's added at cannot be modified directly.");
  }

  if (data.completedAt) {
    throw new Error("Task's completed at cannot be modified directly.");
  }

  if (typeof data.isCollapsed === "string") {
    data.isCollapsed = data.isCollapsed === "true";
  }

  return data;
}

async function generateTaskId() {
  const tasks = await getTasks();
  let id;
  do {
    id = "6" + generateId();
  } while (tasks.some((p) => p.id === id));
  return id;
}

export async function addTask({ prevId, nextId, ...rawData }) {
  const data = cleanTaskData(rawData);

  const tasks = await getTasks();

  // Get correct location of task
  let childOrder;
  if (nextId) {
    const nextTask = tasks.find((t) => t.id === nextId);
    childOrder = nextTask.childOrder - 0.5;
    data.parentId = nextTask.parentId;
  } else if (prevId) {
    const prevTask = tasks.find((t) => t.id === prevId);
    childOrder = prevTask.childOrder + 0.5;
    data.parentId = prevTask.parentId;
    const allChildIds = [...prevTask.childIds];
    while (allChildIds.length) {
      const currentId = allChildIds.pop();
      const currentTask = tasks.find((t) => t.id === currentId);
      childOrder = Math.max(childOrder, currentTask.childOrder + 0.5);
      allChildIds.push(...currentTask.childIds);
    }
  } else {
    childOrder = tasks.length;
  }

  // Create task
  const id = await generateTaskId();
  const projects = await getProjects();
  const task = {
    id,
    childOrder,
    name: "",
    description: "",
    isCompleted: false,
    dueDate: null,
    priority: 4,
    projectId: projects.find((p) => !p.childOrder).id,
    labelIds: [],
    addedAt: new Date().toISOString(),
    completedAt: null,
    parentId: null,
    depth: 0,
    childIds: [],
    isCollapsed: false,
    ...data,
  };
  tasks.push(task);

  // Update parent task (if necessary)
  if (task.parentId) {
    const parentTask = tasks.find((t) => t.id === task.parentId);
    if (task.projectId === parentTask.projectId) {
      parentTask.childIds.push(id);
      task.depth = parentTask.depth + 1;
    } else {
      task.parentId = null;
    }
  }

  // await new Promise((res) => {
  //   setTimeout(res, 3000);
  // });

  // Set tasks
  if (nextId || prevId) {
    adjustChildOrder(tasks);
  }
  await setTasks(tasks);

  return task;
}

export async function deleteTask({ id }) {
  const tasks = await getTasks();
  const task = tasks.find((t) => t.id === id) ?? null;
  if (!task) {
    throw new Error("There is no task with id: " + id);
  }

  // Update parent task if needed
  if (task.parentId) {
    const parentTask = tasks.find((t) => t.id === task.parentId);
    parentTask.childIds = parentTask.childIds.filter(
      (childId) => childId !== id,
    );
  }

  // Delete tasks
  const nextTask = tasks.find(
    (t) => t.childOrder > task.childOrder && t.depth <= task.depth,
  );
  const nextChildOrder = nextTask?.childOrder ?? tasks.length;
  const updatedTasks = tasks.filter(
    (t) => t.childOrder < task.childOrder || t.childOrder >= nextChildOrder,
  );

  // Set tasks
  adjustChildOrder(updatedTasks);
  await setTasks(updatedTasks);
}

export async function deleteTaskByProjectId(projectId) {
  // Delete tasks
  const tasks = await getTasks();
  const updatedTasks = tasks.filter((t) => t.projectId !== projectId);

  // Set tasks
  adjustChildOrder(updatedTasks);
  await setTasks(updatedTasks);
}

export async function duplicateTask({ id }) {
  const tasks = await getTasks();
  const task = tasks.find((t) => t.id === id) ?? null;
  if (!task) {
    throw new Error("There is no task with id: " + id);
  }

  // Clone tasks
  const nextTask = tasks.find(
    (t) => t.childOrder > task.childOrder && t.depth <= task.depth,
  );
  const nextChildOrder = nextTask?.childOrder ?? tasks.length;
  const clonedTasks = structuredClone(
    tasks.filter(
      (t) => t.childOrder >= task.childOrder && t.childOrder < nextChildOrder,
    ),
  );

  // Create new ids
  const idMap = new Map(
    await Promise.all(
      clonedTasks.map(async (t) => [t.id, await generateTaskId()]),
    ),
  );

  // Update cloned tasks
  for (const task of clonedTasks) {
    task.id = idMap.get(task.id);
    task.childOrder = nextChildOrder - 1 + (task.childOrder + 1) / 1e6;
    task.addedAt = new Date().toISOString();
    task.parentId = idMap.get(task.parentId) ?? task.parentId;
    task.childIds = task.childIds.map((id) => idMap.get(id));
  }
  tasks.push(...clonedTasks);

  // Update parent task (if necessary)
  if (task.parentId) {
    const parentTask = tasks.find((t) => t.id === task.parentId);
    parentTask.childIds.push(idMap.get(id));
  }

  // Set tasks
  adjustChildOrder(tasks);
  await setTasks(tasks);

  return clonedTasks[0];
}

export async function duplicateTasksByProjectId({
  oldProjectId,
  newProjectId,
}) {
  // Clone tasks
  const tasks = await getTasks();
  const clonedTasks = structuredClone(
    tasks.filter((t) => t.projectId === oldProjectId),
  );

  // Create new ids
  const idMap = new Map(
    await Promise.all(
      clonedTasks.map(async (t) => [t.id, await generateTaskId()]),
    ),
  );

  // Update cloned tasks
  for (const task of clonedTasks) {
    task.id = idMap.get(task.id);
    task.childOrder += tasks.length;
    task.projectId = newProjectId;
    task.addedAt = new Date().toISOString();
    task.parentId = idMap.get(task.parentId) ?? null;
    task.childIds = task.childIds.map((id) => idMap.get(id));
  }
  tasks.push(...clonedTasks);

  // Set tasks
  adjustChildOrder(tasks);
  await setTasks(tasks);
}

export async function getTasks() {
  return await localforage.getItem("tasks");
}

async function getTasksByProjectId(projectId) {
  const tasks = await getTasks();
  return tasks.filter((t) => t.projectId === projectId);
}

export async function getTasksInfo({ projectId, taskId }) {
  if (projectId) {
    return await getTasksInfoByProjectId(projectId);
  } else if (taskId) {
    return await getTasksInfoByTaskId(taskId);
  }
  throw new Error("Missing some important params while getting data");
}

async function getTasksInfoByProjectId(projectId) {
  if (!(await isProjectExisted(projectId))) {
    return null;
  }

  const tasks = await getTasksByProjectId(projectId);

  const completeOrder = [];
  const incompleteOrder = [];

  let depth = 0;
  let isDepth0ParentCompleted = false;
  let isCollapsed = false;
  for (const task of tasks) {
    if (task.depth === 0) {
      isDepth0ParentCompleted = task.isCompleted;
    }
    if (task.depth <= depth || !isCollapsed) {
      if (isDepth0ParentCompleted) {
        completeOrder.push(task.id);
        depth = task.depth;
        isCollapsed = task.isCollapsed;
      } else {
        incompleteOrder.push(task.id);
        depth = task.depth;
        isCollapsed = task.isCollapsed;
      }
    }
  }

  return { completeOrder, incompleteOrder, tasks };
}

async function getTasksInfoByTaskId(taskId) {
  const tasks = await getTasks();

  // Get current task
  const task = tasks.find((t) => t.id === taskId) ?? null;
  if (!task) {
    return null;
  }
  const ids = [task.id];

  // Get parent task & sibling tasks
  const parentTask = tasks.find((t) => t.id === task.parentId) ?? null;
  if (parentTask) {
    const siblingIds = parentTask.childIds;
    ids.push(task.parentId, ...siblingIds);
  }

  // Get child tasks & grandchild tasks
  const childTasks = tasks.filter((t) => task.childIds.includes(t.id));
  const grandchildIds = childTasks.flatMap((t) => t.childIds);
  ids.push(...task.childIds, ...grandchildIds);

  const filteredTasks = tasks.filter((t) => ids.includes(t.id));

  const completeOrder = [];
  const incompleteOrder = [];
  const siblingOrder = [];

  for (const t of filteredTasks) {
    if (task.childIds.includes(t.id)) {
      if (t.isCompleted) {
        completeOrder.push(t.id);
      } else {
        incompleteOrder.push(t.id);
      }
    } else if (parentTask?.childIds.includes(t.id)) {
      siblingOrder.push(t.id);
    }
  }

  return { completeOrder, incompleteOrder, siblingOrder, tasks: filteredTasks };
}

export async function getIncompleteTasksCount() {
  const tasks = await getTasks();
  const incompleteTasks = tasks.filter((t) => !t.isCompleted);

  // Count incomplete tasks of each project
  const incompleteTasksCountMap = incompleteTasks.reduce((acc, t) => {
    const count = acc.get(t.projectId) ?? 0;
    acc.set(t.projectId, count + 1);
    return acc;
  }, new Map());

  // Count imcomplete tasks on or before today & isOverdue
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayCount = incompleteTasks.filter(
    (t) => t.dueDate !== null && t.dueDate < tomorrow,
  ).length;
  incompleteTasksCountMap.set("today", todayCount);
  const isOverdue = incompleteTasks.some(
    (t) => t.dueDate !== null && t.dueDate < today,
  );

  return { incompleteTasksCountMap, isOverdue };
}

export async function moveTask({ depth: depthInStr, id, prevId, nextId }) {
  const depth = Number(depthInStr);

  const tasks = await getTasks();
  const task = tasks.find((t) => t.id === id) ?? null;
  if (!task) {
    throw new Error("There is no task with id: " + id);
  }

  // No need to move the only task in task panel / project
  if (prevId === "null" && nextId === "null") {
    return task;
  }

  const prevTask = tasks.find((t) => t.id === prevId) ?? null;
  const nextTask = tasks.find((t) => t.id === nextId) ?? null;

  // Remove task's parentId & adjust original parent's child id
  if (task.parentId) {
    const parentTask = tasks.find((t) => t.id === task.parentId);
    parentTask.childIds = parentTask.childIds.filter(
      (childId) => childId !== id,
    );
    task.parentId = null;
  }
  task.depth = null;

  let parentTask = null;
  if (!depth) {
    task.depth = 0;
  } else {
    if (!prevTask) {
      // Moving task to the top inside task panel
      parentTask = tasks.find((t) => t.id === nextTask.parentId);
    } else if (depth > prevTask.depth) {
      parentTask = tasks.find((t) => t.id === prevId);
    } else if (depth === prevTask.depth) {
      parentTask = tasks.find((t) => t.id === prevTask.parentId);
    } else {
      let realPrevId = prevId;
      let realPrevTask = tasks.find((t) => t.id === realPrevId);
      while (realPrevTask.depth > depth) {
        realPrevId = realPrevTask.parentId;
        realPrevTask = tasks.find((t) => t.id === realPrevId);
      }
      parentTask = tasks.find((t) => t.id === realPrevTask.parentId);
    }
    parentTask.childIds.push(id);
    task.parentId = parentTask.id;
    task.depth = parentTask.depth + 1;
  }

  // Get location of the reference task
  let refChildOrder = prevTask?.childOrder ?? parentTask?.childOrder ?? -1;
  if (prevTask && depth <= prevTask.depth) {
    const allPrevChildIds = prevTask?.childIds.slice() ?? [];
    while (allPrevChildIds.length) {
      const currentId = allPrevChildIds.pop();
      const currentTask = tasks.find((t) => t.id === currentId);
      refChildOrder = Math.max(refChildOrder, currentTask.childOrder);
      allPrevChildIds.push(...currentTask.childIds);
    }
  }

  // Set location of current task & its child tasks
  task.childOrder = refChildOrder + (task.childOrder + 1) / 1e6;
  const allTaskChildIds = [...task.childIds];
  while (allTaskChildIds.length) {
    const currentId = allTaskChildIds.pop();
    const currentTask = tasks.find((t) => t.id === currentId);
    currentTask.childOrder = refChildOrder + (currentTask.childOrder + 1) / 1e6;
    allTaskChildIds.push(...currentTask.childIds);
  }

  // Set projectId and depth of all descendant sub-tasks
  await validateDepth({ tasks, taskIds: [id] });

  // await new Promise((res) => {
  //   setTimeout(res, 3000);
  // });

  // Set tasks
  adjustChildOrder(tasks);
  await setTasks(tasks);

  return task;
}

export async function removeTaskLabel({ id, labelId }) {
  const tasks = await getTasks();
  const task = tasks.find((t) => t.id === id) ?? null;
  if (!task) {
    throw new Error("There is no task with id: " + id);
  }

  // Remove labelId
  task.labelIds = task.labelIds.filter((lid) => lid !== labelId);

  // Set tasks
  await setTasks(tasks);

  return task;
}

async function setTasks(tasks) {
  return await localforage.setItem("tasks", tasks);
}

export async function updateTask({ id, ...rawData }) {
  const tasks = await getTasks();
  const task = tasks.find((t) => t.id === id) ?? null;
  if (!task) {
    throw new Error("There is no task with id: " + id);
  }

  const data = cleanTaskData(rawData);

  if (Object.hasOwn(data, "isCompleted")) {
    if (data.isCompleted) {
      // Add completed time
      data.completedAt = new Date().toISOString();
      // Set all descendant sub-tasks as "complete"
      // Move these tasks to the end of parent task's child
      const parentTask = tasks.find((t) => t.id === task.parentId) ?? null;
      const nextTask =
        parentTask &&
        tasks.find(
          (t) =>
            t.childOrder > parentTask.childOrder && t.depth <= parentTask.depth,
        );
      const nextChildOrder = nextTask?.childOrder ?? tasks.length;
      data.childOrder = nextChildOrder - 1 + (task.childOrder + 1) / 1e6;
      const allChildIds = [...task.childIds];
      while (allChildIds.length) {
        const currentId = allChildIds.pop();
        const currentTask = tasks.find((t) => t.id === currentId);
        currentTask.isCompleted = true;
        if (!currentTask.completedAt) {
          currentTask.completedAt = data.completedAt;
        }
        currentTask.childOrder = tasks.length + currentTask.childOrder / 1e6;
        allChildIds.push(...currentTask.childIds);
      }
    } else {
      // Remove completed time
      data.completedAt = null;
      // Set all ascendant tasks as "incomplete"
      let parentId = task.parentId;
      while (parentId) {
        const parentTask = tasks.find((t) => t.id === parentId);
        parentTask.isCompleted = false;
        parentTask.completedAt = null;
        parentId = parentTask.parentId;
      }
    }
  }

  // Change task's project
  if (data.projectId && task.projectId !== data.projectId) {
    if (task.parentId) {
      const parentTask = tasks.find((t) => t.id === task.parentId);
      parentTask.childIds = parentTask.childIds.filter(
        (childId) => childId !== id,
      );
      data.parentId = null;
    }
    data.depth = 0;
  }

  // Update task
  Object.assign(task, data);

  // Set projectId and depth of all descendant sub-tasks
  await validateDepth({ tasks, taskIds: task.childIds });

  // Set tasks
  adjustChildOrder(tasks);
  await setTasks(tasks);

  return task;
}

async function validateDepth({ tasks, taskIds }) {
  const ids = [...taskIds];
  while (ids.length) {
    const currentId = ids.shift();
    const currentTask = tasks.find((t) => t.id === currentId);
    const parentTask = tasks.find((t) => t.id === currentTask.parentId) ?? null;
    ids.push(...currentTask.childIds);

    // Set projectId and depth
    if (parentTask) {
      currentTask.projectId = parentTask.projectId;
      currentTask.depth = parentTask.depth + 1;
    }

    // Prevent any task with depth >= 5
    if (currentTask.depth === 4) {
      const childIds = currentTask.childIds.splice(
        0,
        currentTask.childIds.length,
      );
      parentTask.childIds.push(...childIds);
      for (const childId of childIds) {
        const childTask = tasks.find((t) => t.id === childId);
        childTask.projectId = parentTask.projectId;
        childTask.parentId = parentTask.id;
        childTask.depth = parentTask.depth + 1;
      }
    }
  }
}

// Initialize
const keys = await localforage.keys();

if (!keys.includes("tasks")) {
  await setTasks([]);
}
