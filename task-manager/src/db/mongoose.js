const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

//define model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number.');
            }
        }
    }
});

// const Task = mongoose.model('Task', {
//     description:{
//         type: String
//     },
//     completed:{
//         type: Boolean
//     }
// })

// instance data
const me = new User({
    name: '      Knz       ',
    email: 'EMAIL@MAIL.COM       '
});

// const data = new Task({
//     description: 'new active now',
//     completed: false
// })

//save to db
me.save()
    .then((me) => {
        console.log(me);
    }).catch((error) => {
        console.log('Error!', error);
    })

// data.save()
//     .then(data => console.log(data))
//     .catch(error => console.log('Error!', error));

