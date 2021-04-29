const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const errorHandler = require("./errorHandlers/errorHandler");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminPanel = require("./routes/adminPanel");

const app = express();

const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

app.use("/", indexRouter);
app.use("/", dashboardRoutes);
app.use("/api/user", userRouter);
app.use("/protected", adminRoutes);
adminPanel(app, connection);

app.get("*", function (req, res) {
  res.render("pages/404");
});

app.use(errorHandler);

module.exports = app;
