// src/middleware/multerConfig.js
import multer from 'multer';
import fs from 'fs';
import path from 'path'; // Import path
import { uploadsDir } from '../config.js'; // Import the uploads directory

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// File filter for audio files
const audioFileFilter = (req, file, cb) => {
    const allowedTypes = /^(audio\/(mp3|wav|ogg|mpeg)|mp3|wav|ogg|mpeg)$/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    const isValid = allowedTypes.test(mimeType) || allowedTypes.test(ext);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Invalid audio file type. Only mp3, wav, ogg, and mpeg are allowed.'));
    }
};

// File filter for cover images
const coverFileFilter = (req, file, cb) => {
    const allowedTypes = /^(image\/(jpeg|jpg|png|gif)|jpeg|jpg|png|gif)$/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    const isValid = allowedTypes.test(mimeType) || allowedTypes.test(ext);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Invalid image file type. Only jpeg, jpg, png, and gif are allowed.'));
    }
};

// Custom storage function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const songName = req.body.songName.replace(/\s+/g, '_');
        const ext = path.extname(file.originalname);
        const randomPrefix = req.randomPrefix;
        const prefix = file.fieldname === 'audioFile' ? randomPrefix : `${randomPrefix}_cover`;
        cb(null, `${prefix}_${songName}${ext}`);
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'audioFile') {
            audioFileFilter(req, file, cb);
        } else if (file.fieldname === 'songCover') {
            coverFileFilter(req, file, cb);
        } else {
            cb(new Error('Unexpected field'));
        }
    }
});

// Export the upload middleware
export default upload; // Use default export