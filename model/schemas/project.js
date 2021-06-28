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
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    contributor: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
