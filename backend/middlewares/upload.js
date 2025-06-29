const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload directory path
const uploadDir = path.join(__dirname, "..", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up disk storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Optional: Filter allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"));
  }
};

// Create the multer instance
const upload = multer({
  storage,
  fileFilter, // remove if you want to allow all files
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB limit
});

module.exports = upload;
