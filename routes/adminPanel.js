const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/Users");
const ValidRegNos = require("../models/ValidRegNos");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const express = require("express");

module.exports = (app, mongoose_connection) => {
  AdminBro.registerAdapter(AdminBroMongoose);
  const adminBro = new AdminBro({
    Database: [mongoose_connection],
    resources: [
      {
        resource: User,
        options: {
          listProperties: ["firebaseUid", "name", "email", "registrationNo"],
        },
      },
      {
        resource: ValidRegNos,
        options: {
          listProperties: ["registrationNo"],
          actions: { edit: { isVisible: false } },
        },
      },
    ],
    rootPath: "/admin",
    branding: {
      companyName: "Zairza",
      logo: false,
      softwareBrothers: false,
    },
  });

  let router = express.Router();
  router.use(checkIfAuthenticated, (req, res, next) => {
    if (req.user == null) {
      res.redirect("/auth?next=/admin");
    } else if (req.user.role == "admin") {
      return next();
    } else {
      const error = new Error("Admin role required for accessing route");
      error.status = "fail";
      error.statusCode = 403;
      next(error);
    }
  });

  router = AdminBroExpress.buildRouter(adminBro, router);
  app.use(adminBro.options.rootPath, router);
};
