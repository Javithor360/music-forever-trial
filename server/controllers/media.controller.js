import fs from 'fs';
import path from 'path';
import { uploadsDir } from '../config.js';

export const getAllFiles = (req, res) => {
    const filesMap = {}; // Object to hold files organized by prefix

    // Read the uploads directory
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading files.' });
        }

        // Organize files by prefix
        files.forEach(file => {
            const prefix = file.split('_')[0]; // Get the prefix from the filename
            const ext = path.extname(file).toLowerCase();

            // Initialize the prefix entry if it doesn't exist
            if (!filesMap[prefix]) {
                filesMap[prefix] = { cover: null, track: null };
            }

            // Check the file type and assign it to the appropriate property
            if (['.mp3', '.wav', '.ogg', '.mpeg'].includes(ext)) {
                filesMap[prefix].track = file; // Assign audio file
            } else if (['.jpeg', '.jpg', '.png', '.gif'].includes(ext)) {
                filesMap[prefix].cover = file; // Assign cover image
            }
        });

        // Convert the filesMap object to an array
        const result = Object.keys(filesMap).map(key => ({
            cover: filesMap[key].cover,
            track: filesMap[key].track,
        }));

        // Return the result
        res.status(200).json(result);
    });
};