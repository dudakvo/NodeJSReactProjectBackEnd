const express = require("express");
const ctrl = require("../../controllers/project");
const router = express.Router();
const {
  validateCreateProject,
  validateUpdateProject,
} = require("./validation");

router.post("/", validateCreateProject, ctrl.createProject);
router.patch("/:projectId", validateUpdateProject, ctrl.editProjectName);
router.delete("/:projectId", ctrl.delProject);

module.exports = router;
