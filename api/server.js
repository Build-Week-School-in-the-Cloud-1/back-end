const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const morgan = require("morgan");

const adminRouter = require("../admin/adminRouter.js");
const usersRouter = require("../users/usersRouter.js");
const tasksRouter =  require("../tasks/tasksRouter.js");
const authenticate = require("../auth/authenticate.js");

const server = express();
server.use(helmet());
server.use(cors());
// server.use(morgan("dev"));
server.use(express.json());

server.use("/api/admin", adminRouter);
server.use("/api/tasks", tasksRouter);
server.use("/api/users", authenticate, usersRouter);

server.get("/", (req, res) => res.json({api: "up"}));

server.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server;