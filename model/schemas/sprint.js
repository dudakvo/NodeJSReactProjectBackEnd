const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const sprintSchema = new Schema({
  sprint_name: { type: String, required: [true, "Set name for sprint"] },
  date_start: { type: Date, default: new Date() },
  date_end: { type: Date, default: new Date() },
  project_id: {
    type: SchemaTypes.ObjectId,
    ref: "project",
  },
});

sprintSchema.plugin(mongoosePaginate);

const Sprint = model("sprint", sprintSchema);

module.exports = Sprint;
