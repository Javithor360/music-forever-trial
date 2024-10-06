import express from 'express';
import upload_router from './routes/upload.routes.js';
import media_router from './routes/media.routes.js';

const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use the upload routes
app.use('/api', upload_router);
app.use('/api', media_router);

app.get(['/', '/api'], (req, res) => {
    res.status(200).json({ message: 'Hello world!' })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});