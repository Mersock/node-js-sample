const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Task = mongoose.model('Task', {
    description:{
        type: String,
        required:true,
    },
    completed:{
        type: Boolean,
        default:false,
    }
});