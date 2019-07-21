const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

//define paths for express config
//set static file
const publicDirectoryPath = path.join(__dirname, '../public');
//customize static file
const viewPath = path.join(__dirname, '../templates/views');
//partials path
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Knz Phumthawan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Knz Phumthawan'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Knz Phumthawan'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'You must provide your address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                'error': error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    'error': error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address:req.query.address
            })
        });
    });

});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        'products': []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Knz Phumthawan',
        errorMessage: 'Help Article Not found.'
    });
});

//set up not found page
//always define last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Knz Phumthawan',
        errorMessage: 'Pages Not Found.'
    });
});

app.listen(3000, () => console.log('app listen on port 3000!'));