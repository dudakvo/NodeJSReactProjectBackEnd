const Project = require("./schemas/project");

const addProject = async (body) => {
  const result = await Project.create({ ...body });
  return result;
};

const changeProjectName = async (userId, id, body) => {
  const result = await Project.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const findProjectByName = async (name) => {
  return await Project.findOne({ name });
};

const removeProject = async (userId, projectId) => {
  const result = await Project.findByIdAndRemove({
    _id: projectId,
    owner: userId,
  });
  return result;
};

const getAllProjects = async (userId) => {
  const result = await Project.find({ owner: userId }).populate({
    path: "owner",
    select: "email -_id",
  });
  return result;
};

module.exports = {
  addProject,
  findProjectByName,
  changeProjectName,
  removeProject,
  getAllProjects,
};
