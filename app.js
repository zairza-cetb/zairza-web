const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const auth_routes = require("./routes/auth");
const passport_setup = require("./passport/setup");
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

// For session storage
var store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "Sessions",
});
// Catch errors
store.on("error", function (error) {
  console.log(error);
});

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

// Passport middleware
passport_setup(passport);

app.use(
  session({
    secret: process.env.SECRET,
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", userRouter);

auth_routes(app, passport);

app.get("*", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use(errorHandler);

module.exports = app;
