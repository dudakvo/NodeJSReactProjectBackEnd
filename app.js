const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const sprintRouter = require("./routes/sprint");
const taskRouter = require("./routes/task");

const { HttpCode } = require("./helpers/constants");

const app = express();

app.use(logger("combined"));
app.use(cors());
app.use(express.json());

app.use("/sprint", sprintRouter);
app.use("/task", taskRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const code = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: err });
});

module.exports = app;
