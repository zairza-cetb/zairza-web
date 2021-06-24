const mongoose = require("mongoose");
const Domains = require("./Domains");
const Users = require("../Users");
const sendMail = require("../../utils/sendMail");
const fs = require("fs");
pathToAttachment = "./utils/skills/sample.pdf";
attachment = fs.readFileSync(pathToAttachment).toString("base64");

const DomainRegistrationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true, required: true },
		domain: { type: mongoose.Schema.Types.ObjectId, ref: "domains", required: true },
		submissions: [
			{
				weekNo: { type: Number, required: true},
				submissionLink: { type: String, required:true },
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

DomainRegistrationSchema.pre("save",async function(next){
	this.wasNew = this.isNew;
	next();
});

DomainRegistrationSchema.post("save",async function(doc){
	if(this.wasNew){
		const domain = await Domains.findById(doc.domain).exec();
		const user = await Users.findById(doc.user).exec();
		if(user.name === undefined){
			user.name = "";
		}
		const err = await sendMail({email: user.email, from:"info@zairza.in", templateId:"d-adca85aca55c44f4bf8287beb4870490", dynamic_template_data: {
			domain: domain.name,
			name: user.name.split(" ")[0],
			process: "Sending for successful registration"
		},
		attachments: [
			{
			  content: attachment,
			  filename: "my_resume_final_.pdf",
			  type: "application/pdf",
			  disposition: "attachment"
			}
		]});
		if(err){
			throw err;
		}
	}
});

module.exports = DomainRegistrations = mongoose.model(
	"domainRegistrations",
	DomainRegistrationSchema
);
