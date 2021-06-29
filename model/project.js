const Project = require("./schemas/project");
const User = require("./schemas/user");

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

const findProjectByName = async (userId, name) => {
  return await Project.findOne({ name }).where({ owner: userId });
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

const attachParticipant = async (projectid, body) => {
  const result = await Project.findOneAndUpdate(
    { _id: projectid },
    { $push: { participants: { ...body } } },
    { new: true, overwrite: false }
  );
  return result;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findParticipant = async (email) => {
  const result = await Project.findOne({
    participants: { $elemMatch: { email } },
  });
  return await result;
};

module.exports = {
  addProject,
  findProjectByName,
  changeProjectName,
  removeProject,
  getAllProjects,
  attachParticipant,
  findUserByEmail,
  findParticipant,
};
