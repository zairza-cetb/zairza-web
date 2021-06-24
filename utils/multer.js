const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

let s3;
if (process.env.NODE_ENV === "production") {
	s3 = new aws.S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});
}

function getMulter(dirName, keyFunc) {
	if (process.env.NODE_ENV === "production") {
		return multer({
			storage: multerS3({
				s3: s3,
				bucket: process.env.AWS_BUCKET_NAME,
				contentType: multerS3.AUTO_CONTENT_TYPE,
				metadata: function (req, file, cb) {
					cb(null, { fieldName: file.fieldname });
				},
				key: keyFunc,
			}),
		});
	}

	return multer({ dest: `temp/multer/${dirName}/` });
}

const uploadEventPoster = getMulter("event-posters", function (req, file, cb) {
	cb(null, "event-posters/" + req.body.name + path.extname(file.originalname));
});

const uploadProfileImage = getMulter("profile-photos", function(req, file, cb){
	cb(null, "profile-photos/" + req.user._id + path.extname(file.originalname));
})

module.exports = { uploadEventPoster, uploadProfileImage, s3 };
