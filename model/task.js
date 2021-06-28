const Task = require("./schemas/task");

const create = async (body) => {
  try {
    return await Task.create({ ...body });
  } catch (error) {
    console.log(error.message);
  }
};

const listBySprintID = async (sprintID) => {
  try {
    return await Task.find({ sprint: sprintID }).populate({
      path: "sprint",
      select: "sprint_name date_start date_end",
    });
  } catch (error) {
    console.log(error.message);
  }
};
// sprint
// populate({
//   path: "sprint",
//   select: "sprint_name, date_start, date_end",
// })
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
