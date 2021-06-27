const Sprint = require("./schemas/sprint");

const create = async (body) => {
  try {
    return await Sprint.create({ ...body });
  } catch (error) {
    console.log(error.message);
  }
};

const listByProjectID = async (projectID) => {
  try {
    return await Sprint.find({ project_id: projectID });
  } catch (error) {
    console.log(error.message);
  }
};

const edit = async (sprintID, sprintName) => {
  try {
    return await Sprint.findOneAndUpdate(
      { _id: sprintID },
      { sprint_name: sprintName },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const removeByID = async (ID) => {
  try {
    return await Sprint.findByIdAndRemove({ _id: ID });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { create, listByProjectID, edit, removeByID };
