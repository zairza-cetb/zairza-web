const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.ZAIRZA_SENDGRID_API);

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
	dynamic_template_data = {},
	from = process.env.ZAIRZA_NEWSLETTER_EMAIL,
	attachments,
} = {}) {
	if (userId) {
		email = Users.findById(userId).exec().email;
	}
	const msg = {
		to: email,
		from: `Zairza <${from}>`,
		subject,
		templateId,
		dynamic_template_data,
		attachments
	};
	try {
		await sgMail.send(msg);
	} catch (error) {
		console.log(error);
		return error;
	}
}

module.exports = sendMail;
