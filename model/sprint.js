const Sprint = require("./schemas/sprint");

const create = async (body) => {
  try {
    return await Sprint.create({ ...body });
  } catch (error) {
    console.log(error.message);
  }
};

const listByProjectID = async (projectID, query) => {
  const { limit = 5, page = 1 } = query;
  const optionSearch = { project_id: projectID };
  try {
    const { docs: sprints, totalDocs: total } = await Sprint.paginate(
      optionSearch,
      {
        limit,
        page,
      }
    );
    return { total, page, sprints };
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
