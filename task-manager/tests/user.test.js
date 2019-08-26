const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Mike',
    email: 'knz@example.com',
    password: '123456789'
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});


// afterEach(() => {
//     console.log('afterEach');
// });

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Knz',
        email: 'knz@mail.com',
        password: '1234567'
    }).expect(201)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
});

test('Should not login none existent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 12345
    }).expect(400);
});
