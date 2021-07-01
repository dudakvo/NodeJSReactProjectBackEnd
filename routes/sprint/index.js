const express = require("express");
const ctrl = require("../../controllers/sprint");
const router = express.Router();
const guard = require("../../helpers/guard");
const { validateCreateSprint, validateUpdateSprint } = require("./validation");

router.get("/:projectID", guard, ctrl.getSprints);
router.post("/", guard, validateCreateSprint, ctrl.addSprint);
router.patch("/:sprintID", guard, validateUpdateSprint, ctrl.editSprint);
router.delete("/:sprintID", guard, ctrl.removeSprint);

module.exports = router;
