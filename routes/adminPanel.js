const AdminBro = require("admin-bro");
const { ACTIONS } = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const express = require("express");
const User = require("../models/Users");
const Newsletter = require("../models/Newsletter");
const ValidRegNos = require("../models/ValidRegNos");
const ChangeLog = require("../models/ChangeLog");
const Events = require("../models/Events");

// Skills ++
const Domains = require("../models/skills/Domains");
const DomainRegistrations = require("../models/skills/DomainRegistrations");


const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");
const admin = require("../firebase/firebaseService");

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
          listProperties: ["name", "email", "registrationNo", "createdAt"],
          actions: {
            delete: { isVisible: false },
            bulkDelete: { isVisible: false },
            deleteUser: {
              actionType: "record",
              guard: "confirmDelete",
              icon: "Delete",
              component: false,
              after:createLog,
              variant: "danger",
              handler: async (request, response, data) => {
                const {
                  record,
                  resource,
                  currentAdmin,
                  h,
                  translateMessage,
                } = data;

                let successMsg = "Removed user from database and firebase";

                if (!request.params.recordId || !record) {
                  throw new NotFoundError(
                    ['You have to pass "recordId" to Delete Action'].join("\n"),
                    "Action#handler"
                  );
                }
                try {
                  await admin
                    .auth()
                    .deleteUser(record.params.firebaseUid)
                    .catch((err) => {
                      successMsg = "Removed user from database only";
                    });
                  await resource.delete(request.params.recordId);
                } catch (error) {
                  if (error instanceof ValidationError && error.baseError) {
                    return {
                      record: record.toJSON(currentAdmin),
                      notice: {
                        message: error.baseError.message,
                        type: "error",
                      },
                    };
                  }
                  throw error;
                }

                let resourceId = null;
                if (resource._decorated) {
                  resourceId = resource._decorated.id();
                } else {
                  resourceId = resource.id();
                }

                return {
                  record: record.toJSON(currentAdmin),
                  redirectUrl: h.resourceUrl({
                    resourceId: resourceId,
                  }),
                  notice: {
                    message: successMsg,
                    type: "success",
                  },
                };
              },
            },
          },
        },
      },
      {
        resource: ValidRegNos,
        options: {
          listProperties: ["registrationNo"],
          actions: {
            edit: { isVisible: false },
            bulkDelete: { isVisible: false },
          },
        },
      },
      {
        resource: Newsletter,
        options: {
          listProperties: ["scheduleDate", "sent", "notSent"],
          editProperties: ["scheduleDate"],
          actions: {
            edit: { isVisible: false },
            bulkDelete: { isVisible: false },
          },
        }
      },
      { resource: Events,
        options: { 
          editProperties: ["name", "startTime", "endTime"],
          actions: {
            new: {isVisible: false},
            bulkDelete: { isVisible: false },
          }
        }
      },
      //SKill++
      Domains,
      DomainRegistrations
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
