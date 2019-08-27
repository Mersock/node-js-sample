const path = require('path');
const express = require('express');
const app = express();

//set port
const port = process.env.PORT || 3000;
//set public directory
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
    console.log(`Server in up on port ${port}`);
});