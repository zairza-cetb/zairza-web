const express = require("express");
const Domains = require("../../models/skills/Domains");
const DomainRegistrations = require("../../models/skills/DomainRegistrations");
const checkIfAuthenticated = require("../../firebase/firebaseCheckAuth");
const config = require("./configDates");
const { extraTime } = require("./configDates");

const router = express.Router();
const apiRouter = express.Router();

router.use(checkIfAuthenticated);
router.use("/api", apiRouter);

isMentor = function (req, res, next) {
	Domains.findById(req.body.domainId, function (err, domain) {
		if (err) {
			return next(err);
		}
		if (!domain || !domain.mentors.includes(req.user._id)) {
			const error = new Error("You are not a mentor for this domain");
			error.status = "restricted";
			error.statusCode = 403;
			error.isOperational = true;
			return next(error);
		}
		next();
	});
};

// router.get("/mentor-dashboard", isMentor, function (req, res, next) {});

apiRouter.post("/register", function (req, res, next) {
	Domains.findById(req.body.domainId, function (err, domain) {
		if (err) {
			return next(err);
		}
		if (!domain) {
			return res.status(500).send({ status: "fail", message: "Domain not found" });
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
	const today = new Date();
	const diff = today - config.weekStart + 1;
	const weekNo = req.body.weekNo;

	if (1 > weekNo || weekNo > config.maxWeekNos)
		return res.status(500).send({ status: "fail", message: "Invalid week number" });

	const weekStartTime = (weekNo - 1) * config.weekInterval;
	const weekEndTime = weekNo * config.weekInterval + config.extraTime;
	if (diff < weekStartTime || diff >= weekEndTime) {
		return res
			.status(500)
			.send({ status: "fail", message: "Cannot submit for this Week number" });
	}
	DomainRegistrations.findOneAndUpdate(
		{ user: req.user._id, "submissions.weekNo": { $nin: [weekNo] } },
		{
			$push: {
				submissions: { weekNo: weekNo },
			},
		},
		{ new: true },
		function (err, reg) {
			if (err) {
				return next(err);
			}
			DomainRegistrations.findOneAndUpdate(
				{ user: req.user._id },
				{
					$set: {
						"submissions.$[elem].submissionLink": req.body.submissionLink,
						"submissions.$[elem].updatedAt": today,
					},
				},
				{
					new: true,
					arrayFilters: [{ "elem.weekNo": weekNo }],
				},
				function (err, reg) {
					if (err) {
						return next(err);
					}
					if (!reg) {
						return res.status(500).send({
							status: "fail",
							message: "User not registered for this domain",
						});
					}
					return res.send({ status: "success" });
				}
			);
		}
	);
});

apiRouter.post("/mentor-submit", isMentor, function (req, res, next) {
	const weekNo = req.body.weekNo;
	const registrationId = req.body.registrationId;
	const approved = req.body.approved;

	if (1 > weekNo || weekNo > config.maxWeekNos)
		return res.status(500).send({ status: "fail", message: "Invalid week number" });

	if (!approved && !req.body.comment) {
		return res.status(500).send({
			status: "fail",
			message: "Comment required for unapproved submissions",
		});
	}

	if (Date.now() - config.weekStart < weekNo * config.weekInterval + config.extraTime) {
		return res
			.status(403)
			.send({ status: "fail", message: "Cannot approve before week ends" });
	}

	DomainRegistrations.findOneAndUpdate(
		{
			_id: registrationId,
			domain: req.body.domainId,
			submissions: { $elemMatch: { weekNo: weekNo, mentor: null } },
		},
		{
			$set: {
				"submissions.$[elem].approved": approved,
				"submissions.$[elem].comment": req.body.comment,
				"submissions.$[elem].mentor": req.user,
			},
		},
		{
			new: true,
			arrayFilters: [{ "elem.weekNo": weekNo, "elem.mentor": null }],
		},
		function (err, registration) {
			if (err) {
				return next(err);
			}
			if (!registration) {
				return res
					.status(500)
					.send({ status: "fail", message: "Not allowed to comment" });
			}

			for (let week of registration.submissions) {
				if (week.weekNo === weekNo) {
					// Marks calculation logic

					let mark = 0;
					if (approved) {
						let diff =
							week.updatedAt -
							config.weekStart -
							(weekNo - 1) * config.weekInterval;
						for (let table of config.marksTable) {
							if (diff < table.time) {
								mark = table.mark;
								break;
							}
						}
					} else {
						mark = config.unapprovedMarks;
					}
					week.mark = mark;
					break;
				}
			}

			registration.save(function (err, reg) {
				if (err) {
					return next(err);
				} else {
					return res.send({ status: "success" });
				}
			});
		}
	);
});

module.exports = router;
