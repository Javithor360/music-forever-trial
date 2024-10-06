const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the uploads directory
}

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Function to generate a random string of specified length
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// File filter for audio files
const audioFileFilter = (req, file, cb) => {
    const allowedTypes = /^(audio\/(mp3|wav|ogg|mpeg)|mp3|wav|ogg|mpeg)$/; // Allowed audio file types
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    console.log("Checking audio file:", file.originalname);
    console.log("MIME type:", mimeType);
    console.log("File extension:", ext);

    const isValid = allowedTypes.test(mimeType) || allowedTypes.test(ext);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Invalid audio file type. Only mp3, wav, ogg, and mpeg are allowed.'));
    }
};

// File filter for cover images
const coverFileFilter = (req, file, cb) => {
    const allowedTypes = /^(image\/(jpeg|jpg|png|gif)|jpeg|jpg|png|gif)$/; // Allowed image file types
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    console.log("Checking cover image:", file.originalname);
    console.log("MIME type:", mimeType);
    console.log("File extension:", ext);

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
        cb(null, uploadsDir); // Destination folder
    },
    filename: (req, file, cb) => {
        const songName = req.body.songName.replace(/\s+/g, '_'); // Replace spaces with underscores
        const ext = path.extname(file.originalname); // Get the file extension
        const randomPrefix = req.randomPrefix; // Use the same prefix
        const prefix = file.fieldname === 'audioFile' ? randomPrefix : `${randomPrefix}_cover`; // Differentiate prefix
        console.log(prefix);
        cb(null, `${prefix}_${songName}${ext}`); // Rename the file with prefix
    }
});

// Initialize multer for audio and cover images
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
}).fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'songCover', maxCount: 1 }
]);

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow your frontend
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Handle file upload
app.post('/api/upload', (req, res, next) => {
    // Generate the random prefix before processing the files
    req.randomPrefix = generateRandomString(20); // Ensure randomPrefix is set

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

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
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});