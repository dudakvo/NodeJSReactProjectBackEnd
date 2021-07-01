const mongoose = require("mongoose");
const Sprint = require("./sprint");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new Schema(
  {
    task_name: { type: String, required: [true, "Set name for task"] },
    scheduled_hours: { type: Number, required: [true, "Set scheduled hours"] },
    hours_spent: { type: Number, default: 0 },
    hours_spent_per_day: { type: Number, default: 0 },
    sprint: {
      type: SchemaTypes.ObjectId,
      ref: "sprint",
      required: [true, "Set sprint ID"],
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

taskSchema.post("save", async function (next) {
  console.log(
    `after save hook runing this.sptint=${this.sprint} this._id=${this._id}`
  );
  Sprint.updateOne({ _id: this.sprint }, { $push: { task: this.sprint } });

  //  next();
});

taskSchema.plugin(mongoosePaginate);

const Task = model("task", taskSchema);

module.exports = Task;
