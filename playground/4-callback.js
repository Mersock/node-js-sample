setTimeout(() => {
    console.log('set 2 second');
}, 2000);

const names = ['knz', 'phum', 'thawan'];

const shortName = names.filter((name) => {
    return name.length <= 4
});

const geocode = (address, callback) => {

    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        callback(data);
    }, 2000);
};

geocode('Bangkok', (data) => {
    console.log(data);
});

const add = (x, y, callback) => {
    setTimeout(() => {
        const sum = x + y;
        callback(sum);
    }, 2000);
};

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
});

