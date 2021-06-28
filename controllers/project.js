const { HttpCode } = require("../helpers/constants");
const {
  addProject,
  findProjectByName,
  changeProjectName,
  removeProject,
  getAllProjects,
} = require("../model/project");

const createProject = async (req, res, next) => {
  try {
    const userId = await req.user.id;
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
          owner: userId,
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
    console.log(e.message);
    next(e);
  }
};

const editProjectName = async (req, res, next) => {
  try {
    const userId = await req.user.id;
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
        const project = await changeProjectName(
          userId,
          req.params.projectId,
          req.body
        );
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
    const userId = await req.user.id;
    const contact = removeProject(userId, req.params.projectId);
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

const getProjectsByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await getAllProjects(userId);
    if (projects.length === 0) {
      res.status(HttpCode.NO_CONTENT).json({
        status: "error",
        code: HttpCode.NO_CONTENT,
        message: "Projects list is empty",
      });
    }
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { projects },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createProject,
  editProjectName,
  delProject,
  getProjectsByUser,
};
