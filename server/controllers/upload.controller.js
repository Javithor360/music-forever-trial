// src/controllers/upload.controller.js
import generateRandomString from '../utils/randomStringGenerator.js';

export const uploadFiles = (req, res) => {
    // Check if files are received
    if (!req.files.audioFile || !req.files.songCover) {
        return res.status(400).json({ message: 'Both audio file and cover image are required.' });
    }

    // Send back a response with relevant information
    res.status(200).json({
        message: 'Files uploaded successfully!',
        audioFile: {
            originalname: req.files.audioFile[0].originalname,
            filename: req.files.audioFile[0].filename,
            size: req.files.audioFile[0].size,
            mimetype: req.files.audioFile[0].mimetype,
        },
        coverFile: {
            originalname: req.files.songCover[0].originalname,
            filename: req.files.songCover[0].filename,
            size: req.files.songCover[0].size,
            mimetype: req.files.songCover[0].mimetype,
        },
    });
};