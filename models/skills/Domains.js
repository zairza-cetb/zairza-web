const mongoose = require("mongoose");

const DomainSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		tasks: [
			{
				weekNo: Number,
				description: String,
				resources: [String],
			},
		],
		additionalResources: [String],
		mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
		discussionLink: String,
	},
	{ strict: true, versionKey: false }
);

module.exports = Domains = mongoose.model("domains", DomainSchema);
