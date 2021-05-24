const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.ZAIRZA_SENDGRID_API);

// Function for sending mail through Sendgrid
//    email : can be a list of emails or a single email
//    templateId : template ID for template in Sendgrid
//    dynamic_template_data : Extra variables for templates
//    cb : Callback function with one argument as error
async function sendMail(
  { email, subject = "Zairza", templateId, dynamic_template_data = {} } = {},
) {
  const msg = {
    to: email,
    from: `Zairza <${process.env.ZAIRZA_NEWSLETTER_EMAIL}>`,
    subject,
    templateId,
    dynamic_template_data
  };
  try {
    await sgMail.send(msg);
  }catch (error) {
    return error;
  } 
}

module.exports = sendMail;
