require('../src/db/mongoose');
const User = require('../src/models/user');

// 5d45b31f5cdae91ef4cf81bd

User.findByIdAndUpdate('5d45a43d814e441b935e55ec' , {age : 1}).then(user => {
    console.log(user);
    return User.countDocuments({age : 1})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error);
})