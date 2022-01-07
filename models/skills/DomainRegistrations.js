const mongoose = require("mongoose");
const Domains = require("./Domains");
const Users = require("../Users");
const sendMail = require("../../utils/sendMail");

const DomainRegistrationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			unique: true,
			required: true,
		},
		domain: { type: mongoose.Schema.Types.ObjectId, ref: "domains", required: true },
		submissions: [
			{
				weekNo: { type: Number, required: true },
				submissionLink: { type: String, required: true },
				approved: { type: Boolean, default: null },
				comment: String,
				mark: { type: Number, default: null },
				mentor: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				updatedAt: Date,
			},
		],
	},
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

DomainRegistrationSchema.pre("save", async function (next) {
	this.wasNew = this.isNew;
	next();
});

DomainRegistrationSchema.post("save", async function (doc) {
	if (this.wasNew) {
		const domain = await Domains.findById(doc.domain).exec();
		const user = await Users.findById(doc.user).exec();
		if (user.name === undefined) {
			user.name = "";
		}
		const err = await sendMail({
			email: user.email,
			templateFile: "welcomeMail.ejs",
			subject: "Skills++ | Registration Successful",
			dynamic_template_data: {
				domain: domain.name,
				name: user.name.split(" ")[0],
				discussionLink: domain.discussionLink,
				process: "Sending for successful registration",
			},
			sendgrid: false,
		});
		if (err) {
			throw err;
		}
	}
});

module.exports = DomainRegistrations = mongoose.model(
	"domainRegistrations",
	DomainRegistrationSchema
);
