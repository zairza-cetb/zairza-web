const express = require("express");
const Domains = require("../../models/skills/Domains");
const DomainRegistrations = require("../../models/skills/DomainRegistrations");
const checkIfAuthenticated = require("../../firebase/firebaseCheckAuth");

const router = express.Router();
const apiRouter = express.Router();

router.use(checkIfAuthenticated);
router.use("/api", apiRouter);

apiRouter.post("/register", function (req, res, next) {
	Domains.findOneById(req.body.domainId, function (err, domain) {
		if (err) {
			return next(err);
		}
		DomainRegistrations.create(
			{ user: req.user, domain: domain },
			function (err, registration) {
				if (err) {
					return next(err);
				}
				res.send({ status: "success" });
			}
		);
	});
});

apiRouter.post("/user-submit", function (req, res, next) {
	DomainRegistrations.findOne({ user: req.user._id }, function (err, reg) {
		if (err) {
			return next(err);
		}
        
	});
});

isMentor = function (req, res, next) {
	Domain.findOneById(req.body.domainId, function (err, domain) {
		if (err) {
			return next(err);
		}
		if (!domain.mentors.includes(req.user._id)) {
			const error = new Error("You are not a mentor for this domain");
			error.status = "restricted";
			error.statusCode = 403;
			error.isOperational = true;
			return next(error);
		}
		next();
	});
};

apiRouter.post("/mentor-submit", isMentor, function (req, res, next) {
    // DomainRegistrations.findOneById
});

module.exports = router; 