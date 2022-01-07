const DomainRegistrations = require("../../models/skills/DomainRegistrations");
const Users = require("../../models/Users");
const sendMail = require("../sendMail");

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
						templateId: "d-2ffad5b69c0f4a04a303ec22a4cebc20",
						from: "info@zairza.in",
						dynamic_template_data: {
							name: results[i].user.name.split(" ")[0],
							domain: results[i].domain.name,
							weekNo: job.attrs.data.weekNo
						},
					});
				}
				done();
			});
	});
};
