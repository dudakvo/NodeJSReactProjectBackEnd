const { HttpCode } = require("../helpers/constants");
const {
  addProject,
  findProjectByName,
  changeProjectName,
  removeProject,
} = require("../model/project");

const createProject = async (req, res, next) => {
  try {
    if (req.body.name) {
      const projectIsExisted = await findProjectByName(req.body.name);
      if (projectIsExisted) {
        return res.status(HttpCode.CONFLICT).json({
          status: "error",
          code: HttpCode.CONFLICT,
          message: `Project with name ${req.body.name} already exists`,
        });
      } else {
        const project = await addProject({
          ...req.body,
        });
        return res.status(HttpCode.CREATED).json({
          status: "success",
          code: HttpCode.CREATED,
          data: { project },
        });
      }
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Some error occured, please try again",
      });
    }
  } catch (e) {
    next(e);
  }
};

const editProjectName = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    }
    if (req.body.name) {
      const projectIsExisted = await findProjectByName(req.body.name);
      if (projectIsExisted) {
        return res.status(HttpCode.CONFLICT).json({
          status: "error",
          code: HttpCode.CONFLICT,
          message: `Project with name ${req.body.name} already exists`,
        });
      } else {
        const project = await changeProjectName(req.params.projectId, req.body);
        return res.status(HttpCode.CREATED).json({
          status: "success",
          code: HttpCode.CREATED,
          data: { project },
        });
      }
    }

    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const delProject = async (req, res, next) => {
  try {
    const contact = removeProject(req.params.projectId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: "Project was succesfully deleted",
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createProject,
  editProjectName,
  delProject,
};
