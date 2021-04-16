const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const errorHandler = require("./error_handlers/errorHandler");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const admin_panel = require("./routes/admin_panel");

const app = express();

const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

admin_panel(app, connection);

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

app.use("/", indexRouter);
app.use("/user", userRouter);


app.get("*", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use(errorHandler);

module.exports = app;
