import express from 'express';
import upload_router from './routes/upload.routes.js';

const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use the upload routes
app.use('/api', upload_router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});