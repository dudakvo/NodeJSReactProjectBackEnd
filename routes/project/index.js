const express = require("express");
const ctrl = require("../../controllers/project");
const router = express.Router();
const guard = require("../../helpers/guard");
const {
  validateCreateProject,
  validateUpdateProject,
} = require("./validation");

router.get("/", guard, ctrl.getProjectsByUser);
router.post("/", guard, validateCreateProject, ctrl.createProject);
router.patch("/:projectId", guard, validateUpdateProject, ctrl.editProjectName);
router.delete("/:projectId", guard, ctrl.delProject);

module.exports = router;
