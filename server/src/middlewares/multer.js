const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extnameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetypeValid = allowedTypes.test(file.mimetype);

  if (extnameValid && mimetypeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter,
});

module.exports = upload;
