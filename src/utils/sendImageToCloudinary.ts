import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs/promises'; 

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = async (imageName: string, path: string) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // File successfully uploaded; attempt to delete it
    try {
      await fs.unlink(path); // Cleaner with async/await
      console.log('File deleted successfully');
    } catch (unlinkError) {
      console.error('Error deleting file:', unlinkError.message);
    }

    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads/`); // Ensure path correctness
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export const upload = multer({ storage: storage });
