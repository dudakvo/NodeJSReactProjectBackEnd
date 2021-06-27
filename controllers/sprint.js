const { HttpCode } = require("../helpers/constants");
const Sprint = require("../model/sprint");

const addSprint = async (req, res, next) => {
  try {
    const sprintAdded = await Sprint.create(req.body);
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: sprintAdded });
  } catch (error) {
    next(error.message);
  }
};

const getSprints = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    const sprints = await Sprint.listByProjectID(req.params.projectID);
    if (sprints) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: sprints,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      massage: "not found",
    });
  } catch (error) {
    next(error);
  }
};

const editSprint = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    if (req.body.sprint_name) {
      const result = await Sprint.edit(
        req.params.sprintID,
        req.body.sprint_name
      );
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: result,
      });
      return result;
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      massage: "missing field sprint name",
    });
  } catch (error) {
    next(error.message);
  }
};

const removeSprint = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    const sprint = await Sprint.removeByID(req.params.sprintID);
    if (sprint) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: sprint,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      massage: "not found",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = { addSprint, editSprint, removeSprint, getSprints };
