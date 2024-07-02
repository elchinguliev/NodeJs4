const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const tourRouter=require("./routes/tourRoutes");
const userRouter=require("./routes/userRoutes");
const studentRouter=require("./routes/studentRouter");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);



module.exports=app;
