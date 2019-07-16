const request = require('request');
const geocode = require('./utils/geocode');

// const url = 'https://api.darksky.net/forecast/82fa373470c974f33e2aeb3dcf4ecba7/37.8267,-122.4233';

// request({url:url,json:true},(error,response) => {
//     if(error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error){
//         console.log('Unable to find location.')
//     } else{
//         console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degress out.There is a ${response.body.currently.precipProbability}% changce of rain.`);
//     }
// });

// const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia256cGh1bXRoYXdhbiIsImEiOiJjankzandvNDkwNjNiM2NuejRxZzNuNDU4In0.YAN-vRaqT_RNVlcUw5Ol_g';

// request({url:geoCodeUrl,json: true},(error,response) => {
//     // console.log(error);
//     // console.log(response);
//     if(error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.features.length === 0){
//         console.log('Unable to find location.');
//     }else{
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(latitude,longitude);
//     }
// });

geocode('Bangkok', (error, data) => {
    console.log(`Error`, error);
    console.log(`Data`, data);
});

