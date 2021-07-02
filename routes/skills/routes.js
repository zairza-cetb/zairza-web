const express = require("express");
const Domains = require("../../models/skills/Domains");
const DomainRegistrations = require("../../models/skills/DomainRegistrations");
const checkIfAuthenticated = require("../../firebase/firebaseCheckAuth");
const config = require("./configDates");

const router = express.Router();
const apiRouter = express.Router();

router.use(checkIfAuthenticated);
router.use("/api", apiRouter);

isMentor = function (req, res, next) {
	if (req.method == "POST") {
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
			return next();
		});
	} else if (req.method == "GET") {
		Domains.find(
			{ mentors: req.user._id },
			{ _id: 1, name: 1 },
			function (err, domains) {
				if (err) {
					return next(err);
				}
				if (domains.length === 0) {
					const error = new Error("You are not a Mentor");
					error.status = "restricted";
					error.statusCode = 403;
					error.isOperational = true;
					return next(error);
				}
				req.domains = domains;
				return next();
			}
		);
	} else {
		return res.status(404).send({ status: "fail", message: "Method not supported" });
	}
};

router.get("/mentor-dashboard", isMentor, function (req, res, next) {
	DomainRegistrations.aggregate(
		[
			{
				$match:{
					domain: req.body.domainId
				}
			},
			{
				$lookup: {
					from: "domains",
					localField: "domain",
					foreignField: "_id",
					as: "domainObject",
				},
			},
			{
				$unwind: {
					path: "$submissions",
				},
			},
			{
				$project: {
					_id: 0,
					registrationId: "$_id",
					submission: "$submissions",
					domain: 1,
					domainName: {
						$arrayElemAt: ["$domainObject.name", 0],
					},
				},
			},
		],
		function (err, submissions) {
			if (err) {
				return next(err);
			}
			return res.send({ submissions });
		}
		);
		// res.send({ domains: req.domains });
	});
	
router.get("/user-dashboard",async function (req, res, next) {
	const now = Date.now();
	isRegistered = await DomainRegistrations.findOne({user:req.user._id}).exec();
	if (now < config.eventStart.getTime() || !isRegistered){
		domains = await Domains.find({},{name:1}).exec();
		res.render("pages/dashboard/skills", {
			user: req.user,
			layout: "pages/base",
			domains,
			isRegistered
		});
	} else {
		const maxWeeks = Math.floor((now - config.weekStart.getTime())/config.weekInterval) + 1;
		DomainRegistrations.aggregate(
			[
				{
					$match: {
						user: req.user._id
					}
				},
				{
					$lookup: {
						from: "domains",
						localField: "domain",
						foreignField: "_id",
						as: "domain",
					},
				},
				{
					$set: {
						domain: {
							$arrayElemAt: ["$domain", 0],
						},
					},
				},
				{
					$unwind: {
						path: "$domain.tasks",
					},
				},
				{
					$project: {
						user: 1,
						domain: 1,
						task: "$domain.tasks",
						submission: {
							$filter: {
								input: "$submissions",
								as: "submission",
								cond: {
									$eq: ["$$submission.weekNo", "$domain.tasks.weekNo"],
								},
							},
						},
					},
				},
				{
					$set: {
						"task.submission": {
							$arrayElemAt: ["$submission", 0],
						},
					},
				},
				{
					$unset: ["domain.mentors", "domain.tasks", "submission"],
				},
				{
					$addFields: {
					"task.resource": {
						$cond: [
						{
							$gt: [
							'$task.weekNo', maxWeeks
							]
						}, '$$REMOVE', '$task.resource'
						]
					}
					}
				},
				{
					$group: {
						_id: {
							_id: "$_id",
							user: "$user",
							domain: "$domain",
						},
						tasks: {
							$push: "$task",
						},
					},
				},
				{
					$project: {
						_id: 0,
						registrationId: "$_id._id",
						domain: "$_id.domain",
						tasks: 1
					},
				},
			],
			function (err, result) {
				if (err) {
					return next(err);
				}
				if (result.length == 0) {
					return res.status(404).send("Not registered");
				}
				// console.log(result[0]);


				res.render("pages/dashboard/skilldashboard", {
					user: req.user,
					layout: "pages/base",
					eventData: result[0],
				});
			}
		);
	}
});

apiRouter.post("/register", function (req, res, next) {
	const now = Date.now();
	if (now >= config.registrationEnd) {
		return res.status(400).send({status: "fail", message: "Sorry! The registration deadline has passed"});
	}

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

	if ( (!weekNo) || 1 > weekNo || weekNo > config.maxWeekNos)
		return res.status(500).send({ status: "fail", message: "Invalid week number" });

	const weekStartTime = (weekNo - 1) * config.weekInterval;
	const weekEndTime = weekNo * config.weekInterval + config.extraTime;
	if (diff < weekStartTime || diff >= weekEndTime) {
		return res
			.status(500)
			.send({ status: "fail", message: "Submission deadline has passed" });
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

	if (!req.body.comment) {
		return res.status(500).send({
			status: "fail",
			message: "Comment required",
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
