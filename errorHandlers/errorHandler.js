const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error
    console.error("ERROR ::: ", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// For handling common errors in DB

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  const error = new Error(message);
  error.status = "fail";
  error.statusCode = 400;
  return error;
};

const handleDuplicateFieldsDB = (err) => {
  const key = Object.keys(err.keyValue)[0];
  const message = `${err.keyValue[key]} already exists`;

  const error = new Error(message);
  error.status = "fail";
  error.statusCode = 400;
  error.isOperational = true;
  return error;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  const error = new Error(message);
  error.status = "fail";
  error.statusCode = 400;
  return error;
};

// For handling non-api errors

const showErrorPage = (err, res) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    res.render("pages/500");
  }
};

const redirectAuthPage = (err, req, res) => {
  res.redirect(`/auth?next=${req.url}`);
};

const showAccessDeniedPage = (err, req, res) => {
  res.render("pages/403");
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (!req.url.startsWith("/api/")) {
    if (err.codePrefix == "auth") {
      return redirectAuthPage(err, req, res);
    } else if (err.statusCode === 403) {
      return showAccessDeniedPage(err, req, res);
    }
    return showErrorPage(err, res);
  }

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
