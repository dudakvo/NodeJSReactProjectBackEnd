const express = require("express");
const ctrl = require("../../controllers/task");
const router = express.Router();
const guard = require("../../helpers/guard");
const { validateUpdateTask, validateCreateTask } = require("./validation");

router.post("/", guard, validateCreateTask, ctrl.addTask);
router.get("/search", guard, ctrl.searchTaskByName);
router.get("/:sprintID", guard, ctrl.getTaskBySprintID);
router.patch("/:taskID", guard, validateUpdateTask, ctrl.updateTaskHours);
router.delete("/:taskID", guard, ctrl.removeTask);

module.exports = router;
