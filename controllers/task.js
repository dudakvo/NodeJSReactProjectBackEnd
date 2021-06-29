const { HttpCode } = require("../helpers/constants");
const Task = require("../model/task");

const addTask = async (req, res, next) => {
  try {
    const taskAdded = await Task.create(req.body);
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: taskAdded });
  } catch (error) {
    next(error.message);
  }
};

const getTaskBySprintID = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    const task = await Task.listBySprintID(req.params.sprintID);
    if (task) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: task,
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

const removeTask = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    const task = await Task.removeByID(req.params.taskID);
    if (task) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: task,
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

const updateTaskHours = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    if (req.body.hours_spent_per_day) {
      const result = await Task.edit(
        req.params.taskID,
        req.body.hours_spent_per_day
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
      massage: "missing field hours_spent_per_day",
    });
  } catch (error) {
    next(error.message);
  }
};

const searchTaskByName = async (req, res, next) => {
  try {
    // const userID = req.user.id;
    const task = await Task.searchByName(req.query.task_name);
    if (task) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: task,
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

module.exports = {
  addTask,
  getTaskBySprintID,
  removeTask,
  updateTaskHours,
  searchTaskByName,
};
