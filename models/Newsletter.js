const mongoose = require("mongoose");
const agenda = require("../utils/agendaJobs");

const NewsletterSchema = new mongoose.Schema(
	{
		scheduleDate: {
			type: Date,
			required: true,
		},
		sent: Number,
		notSent: Number,
		message: String,
    	agendaJobId: String,
		affectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	},
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

NewsletterSchema.pre("save", function (next) {
  agenda.schedule(this.scheduleDate, "send newsletter", { newsletterId: this._id }).then((job)=>{
    this.agendaJobId = job.attrs._id;
    next();
  });
});

NewsletterSchema.post("findOneAndRemove", function (data) {
  const collection = agenda._collection.collection || agenda._collection;
  agenda.cancel({
    _id: collection.s.pkFactory(data.agendaJobId)
  });
});

module.exports = Newsletter = mongoose.model("newsletters", NewsletterSchema);