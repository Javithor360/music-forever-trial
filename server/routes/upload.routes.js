import express from 'express';
import upload from '../middleware/multerConfig.js';
import assignRandomPrefix from '../middleware/assignRandomPrefix.js';
import { uploadFiles } from '../controllers/upload.controller.js';

const upload_router = express.Router();

// Use the upload middleware for the upload route
upload_router.post('/upload', assignRandomPrefix, upload.fields([{ name: 'audioFile' }, { name: 'songCover' }]), uploadFiles);

export default upload_router;