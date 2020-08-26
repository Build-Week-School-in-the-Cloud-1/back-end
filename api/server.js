const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const adminRouter = require("../admin/adminRouter.js");
const authRouter = require("../auth/authRouter.js");
const tasksRouter =  require("../tasks/tasksRouter.js");
const authenticate = require("../auth/authenticate.js");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/admin", /*authenticate,*/ adminRouter);
server.use("/api/tasks", /*authenticate,*/ tasksRouter);
server.use("/api/auth",  authRouter);

server.get("/", (req, res) => res.json({api: "up"}));

server.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server;