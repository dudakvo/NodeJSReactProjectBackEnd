const Project = require("./schemas/project");

const addProject = async (body) => {
  const result = await Project.create({ ...body });
  return result;
};

const changeProjectName = async (id, body) => {
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

const removeProject = async (projectId) => {
  const result = await Project.findByIdAndRemove({ _id: projectId });
  return result;
};

module.exports = {
  addProject,
  findProjectByName,
  changeProjectName,
  removeProject,
};
