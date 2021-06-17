const mongoose = require("mongoose");

const DomainRegistrationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true},
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
				mark: { type: Number, default: null },
			},
		],
	},
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

// DomainRegistrationSchema.index({ user: 1, domain: 1 }, { unique: true });
module.exports = DomainRegistrations = mongoose.model(
	"domainRegistrations",
	DomainRegistrationSchema
);
