const mongoose = require("mongoose");

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

module.exports = DomainRegistrations = mongoose.model(
	"domainRegistrations",
	DomainRegistrationSchema
);
