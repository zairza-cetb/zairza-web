const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "zairza-website",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(
				null,
				"event-posters/" +
					file.fieldname +
					"-" +
					Date.now() +
					path.extname(file.originalname)
			);
		},
	}),
});

module.exports = upload;
