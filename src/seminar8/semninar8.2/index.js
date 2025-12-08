"use strict";

import express from "express";
import dotenv from "dotenv";
import departmentsRouter from "./routes/departments.js";
import statusRouter from "./routes/status.js";

dotenv.config();

const app = express();


//implement a middleware that logs to the console the method and url of each request that is made to the server
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

// Error handler middleware that logs the stack trace
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
});