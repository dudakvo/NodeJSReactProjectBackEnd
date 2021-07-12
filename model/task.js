const Task = require("./schemas/task");

const create = async (body) => {
  try {
    return await Task.create({ ...body });
  } catch (error) {
    console.log(error.message);
  }
};

const listBySprintID = async (sprintID, query) => {
  const { limit = 5, page = 1 } = query;
  const optionSearch = { sprint: sprintID };
  try {
    const { docs: task, totalDocs: total } = await Task.paginate(optionSearch, {
      limit,
      page,
    });
    return { total, page, task };
  } catch (error) {
    console.log(error.message);
  }
};

const edit = async (taskID, hoursSpentPerDay) => {
  try {
    return await Task.findOneAndUpdate(
      { _id: taskID },
      { hours_spent_per_day: hoursSpentPerDay },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const removeByID = async (ID) => {
  try {
    return await Task.findByIdAndRemove({ _id: ID });
  } catch (error) {
    console.log(error.message);
  }
};

const searchByName = async (name) => {
  try {
    return await Task.find({ task_name: name.trim() });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { create, listBySprintID, edit, removeByID, searchByName };
