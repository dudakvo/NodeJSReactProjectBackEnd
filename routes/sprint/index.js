const express = require("express");
const ctrl = require("../../controllers/sprint");
const router = express.Router();

router.get("/:projectID", ctrl.getSprints);
router.post("/", ctrl.addSprint);
router.patch("/:sprintID", ctrl.editSprint);
router.delete("/:sprintID", ctrl.removeSprint);

module.exports = router;
