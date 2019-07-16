const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Bangkok', (error, data) => {
    console.log(`Error`, error);
    console.log(`Data`, data);
});

forecast(13.75,100.51667,(error,data) => {
    console.log(`Error`,error);
    console.log(`Data`,data);
});


