const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.ZAIRZA_SENDGRID_API);


// Function for sending mail through Sendgrid
//    email : can be a list of emails or a single email
//    templateId : template ID for template in Sendgrid
//    dynamic_template_data : Extra variables for templates
//    cb : Callback function with one argument as error
function sendMail(
  {
    email,
    subject = "Zairza",
    templateId,
    dynamic_template_data = {}
  } = {},
  cb
) {
  const msg = {
    to: email,
    from: `Zairza <${process.env.ZAIRZA_NEWSLETTER_EMAIL}>`,
    subject,
    templateId,
    dynamic_template_data
  };
  sgMail
    .send(msg)
    .then(() => {
      cb();
    })
    .catch((error) => {
      cb(error);
    });
}

module.exports = sendMail;
