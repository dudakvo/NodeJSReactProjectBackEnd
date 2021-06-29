const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    participants: {
      type: Object,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
