const mongoose = require("mongoose");
const { s3 } = require("../utils/multer");

const EventSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imageURL: {
			type: String,
			required: true,
		},
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
	},
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

EventSchema.post("findOneAndRemove", function (data) {
	if (process.env.NODE_ENV === "production") {
		s3.deleteObject(
			{
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: data.imageURL.replace(/^.*\/\/[^\/]+\//, ""),
			},
			function (err, data) {
				if (err) {
					throw err;
				}
				console.log(data);
			}
		);
	}
});

module.exports = Events = mongoose.model("events", EventSchema);
