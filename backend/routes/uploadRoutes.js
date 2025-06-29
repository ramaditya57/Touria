import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

const router = express.Router();
router.post("/image", upload.single("image"), (req, res) => {
  res.json({ file: req.file.path });
});

export default router;
