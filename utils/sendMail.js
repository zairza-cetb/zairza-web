const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

if (process.env.ZAIRZA_SENDGRID_API) sgMail.setApiKey(process.env.ZAIRZA_SENDGRID_API);

let transporter;
if (process.env.GMAIL_USERNAME) {
	transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASS,
		},
	});
}

// Function for sending mail through Sendgrid
//    email : can be a list of emails or a single email
//    templateId : template ID for template in Sendgrid
//    dynamic_template_data : Extra variables for templates
//    cb : Callback function with one argument as error
async function sendMail({
	email,
	userId,
	subject = "Zairza",
	templateId,
	templateFile,
	dynamic_template_data = {},
	from = process.env.ZAIRZA_NEWSLETTER_EMAIL,
	attachments,
	sendgrid = true,
} = {}) {
	if (userId) {
		email = Users.findById(userId).exec().email;
	}
	if (sendgrid) {
		const msg = {
			to: email,
			from: `Zairza <${from}>`,
			subject,
			templateId,
			dynamic_template_data,
			attachments,
		};
		try {
			await sgMail.send(msg);
		} catch (error) {
			console.log(error);
			return error;
		}
	} else {
		ejs.renderFile(
			path.join(__dirname, "skills/mail/", templateFile),
			dynamic_template_data,
			(err, data) => {
				if (err) {
					console.log(err);
					throw err;
				}
				transporter.sendMail(
					{
						from: process.env.GMAIL_USERNAME,
						to: email,
						subject: subject,
						html: data,
					},
					function (err, info) {
						if (err) {
							console.log(err);
							throw err;
						}
					}
				);
			}
		);
	}
}

module.exports = sendMail;
