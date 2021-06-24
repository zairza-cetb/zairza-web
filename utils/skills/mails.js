const DomainRegistrations = require("../../models/skills/DomainRegistrations");
const Users = require("../../models/Users");
const sendMail = require("../sendMail");
const mongoose = require("mongoose");
const fs = require("fs");
pathToAttachment = `${__dirname}/sample.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

module.exports = (agenda) => {
	// Send mail to all skills++ registered users that week's task has been unlocked
	agenda.define("week start", async function (job, done) {
		DomainRegistrations.find({})
			.populate("user")
			.populate("domain")
			.exec(function (err, results) {
				if (err) {
					throw err;
				}
				for (let i = 0; i < results.length; i++) {
					if (results[i].user.name === undefined) {
						results[i].user.name = "";
					}
					sendMail({
						email: results[i].user.email,
						templateId: "d-29d30da4f328411c98aba9923868d1f8",
						dynamic_template_data: {
							name: results[i].user.name.split(" ")[0],
							domain: results[i].domain.name,
							process: `week start ${job.attrs.data.weekNo}`,
						},
					});
				}
				done();
			});
	});
	// Send mail to all users that registration process for skills++ has started
	agenda.define("skill++ registration start", async function (job) {
		Users.find({ role: { $ne: "restricted" },
			// _id:mongoose.Schema.ObjectId("60d036543a802d148c58abf6") 
		}, function (err, users) {
			if (err) {
				throw err;
			}
			for (let i = 0; i < users.length; i++) {
				if (users[i].name === undefined) {
					users[i].name = "";
				}
				sendMail({
					email: users[i].email,
					templateId: "d-29d30da4f328411c98aba9923868d1f8",
					from: "info@zairza.in",
					dynamic_template_data: {
						name: users[i].name.split(" ")[0],
						process: "skill++ registration start",
					},
					attachments: [
						{
							content: attachment,
							filename: "my_resume_final_.pdf",
							type: "application/pdf",
							disposition: "attachment",
						},
					],
				});
			}
		});
	});
};