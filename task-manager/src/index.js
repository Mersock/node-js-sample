const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routers/users');
const taksRouter = require('./routers/tasks');

//set express json
app.use(express.json());

//set router from express
app.use(userRouter);
app.use(taksRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

const bcrypt = require('bcryptjs');

const myFunction = async() => {
    const password= 'Knz1234567';
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);
}

myFunction();

