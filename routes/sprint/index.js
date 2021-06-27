const express = require("express");
const ctrl = require("../../controllers/sprint");
const router = express.Router();

router.get("/", ctrl.getSprint);
router.post("/", ctrl.addSprint);
router.patch("/:id", ctrl.editSprint);
router.delete("/:id", ctrl.editSprint);

module.exports = router;
