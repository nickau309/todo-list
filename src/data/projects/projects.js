import localforage from "localforage";
import { adjustChildOrder, generateId } from "../general";
import { deleteTaskByProjectId, duplicateTasksByProjectId } from "../tasks";

function cleanProjectData({ ...data }) {
  if (data.id) {
    throw new Error("Project's id cannot be modified directly.");
  }

  if (data.childOrder) {
    throw new Error("Project's child order cannot be modified directly.");
  }

  if (data.name) {
    data.name = data.name.trim().slice(0, 120);
  }

  if (typeof data.isArchived === "string") {
    data.isArchived = data.isArchived === "true";
  }

  if (typeof data.isFavorite === "string") {
    data.isFavorite = data.isFavorite === "true";
  }

  return data;
}

async function generateProjectId() {
  const projects = await getProjects();
  let id;
  do {
    id = "2" + generateId();
  } while (projects.some((p) => p.id === id));
  return id;
}

export async function addProject({ prevId, nextId, ...rawData }) {
  const data = cleanProjectData(rawData);

  const projects = await getProjects();

  // Get correct location of project
  let childOrder;
  if (nextId) {
    const nextProject = projects.find((p) => p.id === nextId);
    childOrder = nextProject.childOrder - 0.5;
  } else if (prevId) {
    const prevProject = projects.find((p) => p.id === prevId);
    childOrder = prevProject.childOrder + 0.5;
  } else {
    childOrder = projects.length;
  }

  // Create project
  const project = {
    id: await generateProjectId(),
    childOrder,
    name: "",
    color: "Charcoal",
    isArchived: false,
    isFavorite: false,
    viewStyle: "list",
    ...data,
  };
  projects.push(project);

  // Set projects
  if (nextId || prevId) {
    adjustChildOrder(projects);
  }
  await setProjects(projects);

  return project;
}

export async function deleteProject({ id }) {
  // Delete projects
  const projects = await getProjects();
  const updatedProjects = projects.filter((p) => p.id !== id);

  // Set projects
  adjustChildOrder(updatedProjects);
  await setProjects(updatedProjects);

  // Delete tasks
  await deleteTaskByProjectId(id);
}

export async function duplicateProject({ id }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id) ?? null;
  if (!project) {
    throw new Error("There is no project with id: " + id);
  }

  // Duplicate project
  const clonedProject = structuredClone(project);
  clonedProject.id = await generateProjectId();
  clonedProject.childOrder = project.childOrder + 0.5;
  clonedProject.name = "Copy of " + project.name;
  projects.push(clonedProject);

  // Set projects
  adjustChildOrder(projects);
  await setProjects(projects);

  // Duplicate tasks
  await duplicateTasksByProjectId({
    oldProjectId: id,
    newProjectId: clonedProject.id,
  });

  return clonedProject;
}

export async function getProjects() {
  const projects = await localforage.getItem("projects");
  return projects ?? [];
}

export async function isProjectExisted(id) {
  const projects = await getProjects();
  return projects.some((p) => p.id === id);
}

export async function moveProject({ id, prevId }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id) ?? null;
  if (!project) {
    throw new Error("There is no project with id: " + id);
  }

  const prevProject = projects.find((p) => p.id === prevId) ?? null;
  const prevChildOrder = prevProject?.childOrder ?? 0;

  // No need to move the project if the position remains the same
  if (project.childOrder === prevChildOrder + 1) {
    return;
  }

  // Update project
  project.childOrder = prevChildOrder + 0.5;

  // Set projects
  adjustChildOrder(projects);
  await setProjects(projects);

  return project;
}

async function setProjects(projects) {
  return await localforage.setItem("projects", projects);
}

export async function updateProject({ id, ...rawData }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id) ?? null;
  if (!project) {
    throw new Error("There is no project with id: " + id);
  }

  // Update project
  const data = cleanProjectData(rawData);
  Object.assign(project, data);

  // Set projects
  await setProjects(projects);

  return project;
}

// Initialize
const keys = await localforage.keys();

if (!keys.includes("projects")) {
  await addProject({ name: "Inbox" });
}
