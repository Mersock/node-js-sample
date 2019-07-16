const https = require('https');

const url = `https://api.darksky.net/forecast/82fa373470c974f33e2aeb3dcf4ecba7/13.75,100.51667`;

const request = https.request(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data = data + chunk.toString()
    });

    res.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error',(error) => {
    console.log(('An error',error));
});

request.end();