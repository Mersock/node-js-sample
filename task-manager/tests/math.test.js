const { calculateTip, celsiusToFahrenheit, farenheitTocelsius, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13);
});

test('Shold ccalculate total with default tip ', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    const total = farenheitTocelsius(32);
    expect(total).toBe(0)
});

test('Should convert 0 C to 32 F', () => {
    const total = celsiusToFahrenheit(0)
    expect(total).toBe(32)
});

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done()
//     }, 2000)
// });

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    }, 2000)
});

test('Should add two numbers async/await', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});

