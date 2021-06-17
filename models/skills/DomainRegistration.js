const mongoose = require("mongoose");

const DomainRegistrationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		domain: { type: mongoose.Schema.Types.ObjectId, ref: "domains" },
		submissions: [
			{
				weekNo: Number,
				status: {
					type: String,
					enum: ["submitted", "reviewed"],
					default: "submitted",
				},
				approved: { type: Boolean, default: null },
				comment: String,
				mark: { type: Integer, default: null },
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
