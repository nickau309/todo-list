WITH RECURSIVE "TaskFamily" AS (
    SELECT id
    FROM "Task"
    WHERE id = $1
      AND "userId" = $2
  UNION
    SELECT t.id
    FROM "Task" t
    JOIN "TaskFamily" tf
      ON tf.id = t."parentTaskId"
    WHERE t."userId" = $2
)
SELECT *
FROM "TaskFamily" tf