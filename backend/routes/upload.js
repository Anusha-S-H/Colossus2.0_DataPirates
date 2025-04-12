const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Load .env variables
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Cloudinary storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'smartcivic',
    allowed_formats: ['jpg','JPG', 'jpeg', 'png'],
    transformation: [{ quality: 'auto' }],
  },
});

const upload = multer({ storage });

// Upload route
router.post('/', upload.single('image'), (req, res) => {
  try {
    // Cloudinary returns the file URL in req.file.path
    res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

module.exports = router;
