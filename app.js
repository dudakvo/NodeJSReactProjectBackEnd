const express = require("express");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
const limiter = require("./helpers/limiter");

const projectsRouter = require("./routes/project");
const sprintRouter = require("./routes/sprint");
const taskRouter = require("./routes/task");
const usersRouter = require("./routes/users");
const { HttpCode } = require("./helpers/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(helmet());
app.use(limiter);
app.use(logger(formatsLogger));
app.use(logger("combined"));
app.use(cors());
app.use(express.json({ limit: 15000 }));
app.use(boolParser());

app.use("/projects", projectsRouter);
app.use("/users", usersRouter);
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
