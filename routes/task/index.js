const express = require("express");
const ctrl = require("../../controllers/task");
const router = express.Router();

router.post("/", ctrl.addTask);
router.get("/search", ctrl.searchTaskByName);
router.get("/:sprintID", ctrl.getTaskBySprintID);
router.patch("/:taskID", ctrl.updateTaskHours);
router.delete("/:taskID", ctrl.removeTask);

module.exports = router;
