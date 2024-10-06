import express from 'express';
import { getAllFiles } from '../controllers/media.controller.js';

const media_router = express.Router();

// Retrieves all files organized by prefix
media_router.get('/files', getAllFiles);

export default media_router;