require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5d45a438814e441b935e55eb').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed:false })
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});