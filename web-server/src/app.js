const express = require('express');
const path = require('path');
const app = express();

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

//set static file
const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));


app.get('/weather', (req, res) => {
    res.send({
        'weather': 'name',
        'cast': 'now'
    });
});


app.listen(3000, () => console.log('app listen on port 3000!'));