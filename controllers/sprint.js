const { HttpCode } = require("../helpers/constants");

const addSprint = () => {};

const getSprint = async (req, res, next) => {
  try {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "NOT FOUND",
      code: HttpCode.NOT_FOUND,
    });
  } catch (error) {
    next(error.message);
  }
};

const editSprint = (req, res, next) => {};

const delSprint = (req, res, next) => {};

module.exports = { addSprint, editSprint, delSprint, getSprint };
