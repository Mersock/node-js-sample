const express = require('express');
const path = require('path');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

//define paths for express config
//set static file
const publicDirectoryPath = path.join(__dirname, '../public');
//customize static file
const viewPath = path.join(__dirname,'../templates');

//setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views',viewPath);
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'knz Phumthawan'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Weather',
        name: 'knz Phumthawan'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Weather',
        name: 'knz Phumthawan'
    })
});

app.get('/weather', (req, res) => {
    res.send({
        'weather': 'name',
        'cast': 'now'
    });
});


app.listen(3000, () => console.log('app listen on port 3000!'));