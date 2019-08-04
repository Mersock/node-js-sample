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