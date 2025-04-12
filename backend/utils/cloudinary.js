// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'daslwkpcn',
  api_key: '431161584719559',
  api_secret: 'I6A6jYC5E21XXDeay4Olm2wwH8A',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'smartcivic',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ quality: 'auto' }],
  },
});

module.exports = { cloudinary, storage };
