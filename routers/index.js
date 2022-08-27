const express = require("express");
const { ApiRoutes } = require("../utils/apiRoutes");

const coreRouter = require("./coreRouter");
const attendanceRouter = require("./attendanceRouter");
const mainRouter = express.Router();
mainRouter.use("/core", coreRouter);
mainRouter.use("/attendance", attendanceRouter);

module.exports = mainRouter;