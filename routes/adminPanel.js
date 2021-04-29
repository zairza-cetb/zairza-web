const AdminBro = require("admin-bro");
const { ACTIONS } = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const express = require("express");
const User = require("../models/Users");
const ValidRegNos = require("../models/ValidRegNos");
const ChangeLog = require("../models/ChangeLog");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const createLog = async (originalResponse, request, context) => {
  if (
    (request.method === "post" &&
      originalResponse.record &&
      !Object.keys(originalResponse.record.errors).length) ||
    context.action.name === "delete"
  ) {
    await ChangeLog.create({
      action: context.action.name,
      userId: request.user,
      resource: context.resource.id(),
      recordId: context.record && context.record.id(),
    });
  }
  return originalResponse;
};

if (process.env.NODE_ENV == "production") {
  ACTIONS.edit.after = createLog;
  ACTIONS.delete.after = createLog;
  ACTIONS.new.after = createLog;
}

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
