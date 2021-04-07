/* Check for authenticated user */

const admin = require("./firebaseService");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

module.exports = checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      User.findOne(
        { firebase_uid: userInfo.uid },
        function (err, existing_user) {
          if (err) {
            return next(err);
          }
          if (!existing_user) {
            User.create({ firebase_uid: userInfo.uid }, function (err, user) {
              if (err) {
                return next(err);
              }
              req.user = user;
              return next();
            });
          } else {
            req.user = existing_user;
            return next();
          }
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(401).send({
        status: "fail",
        message: "You are not authorized to make this request",
      });
    }
  });
};
