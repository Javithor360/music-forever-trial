const express = require("express");
const app = express();

const multer = require('multer');
const upload = multer({ dest: 'server/uploads/' });

app.get('/api', (req, res) => {
    res.send("Hello world!");
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.send(req.file);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});