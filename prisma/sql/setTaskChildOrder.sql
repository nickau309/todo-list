WITH "TargetTask" AS (
  SELECT id, "childOrder" as "oldChildOrder", "projectId"
    FROM "Task"
    WHERE id = $1
), "TasksWithDecrementedChildOrder" AS (
  UPDATE "Task"
    SET "childOrder" = "childOrder" - 1
    WHERE id <> (SELECT id FROM "TargetTask")
      AND "projectId" = (SELECT "projectId" FROM "TargetTask")
      AND "childOrder" > (SELECT "oldChildOrder" FROM "TargetTask")
      AND "childOrder" <= $2
    RETURNING id
), "TasksWithIncrementedChildOrder" AS (
  UPDATE "Task"
    SET "childOrder" = "childOrder" + 1
    WHERE id <> (SELECT id FROM "TargetTask")
      AND "projectId" = (SELECT "projectId" FROM "TargetTask")
      AND "childOrder" < (SELECT "oldChildOrder" FROM "TargetTask")
      AND "childOrder" >= $2
    RETURNING id
), "TaskUpdated" AS (
  UPDATE "Task"
    SET "childOrder" = $2
    WHERE id = (SELECT id FROM "TargetTask")
    RETURNING id
)
SELECT * FROM "TasksWithDecrementedChildOrder"
UNION
SELECT * FROM "TasksWithIncrementedChildOrder"
UNION
SELECT * FROM "TaskUpdated"