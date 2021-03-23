const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/Users");
const ValidRegNos = require("../models/ValidRegNos");

module.exports = (app, mongoose_connection) => {
  AdminBro.registerAdapter(AdminBroMongoose);
  const adminBro = new AdminBro({
    Database: [mongoose_connection],
    resources: [
      {
        resource: User,
        options: {
          listProperties: ["name", "email", "registration_no"],
        },
      },
      { resource: ValidRegNos, options: { listProperties: ["reg_nos"] } },
    ],
    rootPath: "/admin",
    branding: {
      companyName: "Zairza",
      logo: false,
      softwareBrothers: false,
    },
  });

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        if (user.validPassword(password) && user.role == "admin") {
          return user;
        }
      }
      return false;
    },
    cookiePassword: process.env.SECRET,
  });
  app.use(adminBro.options.rootPath, router);
};
