const chalk = require('chalk');
const getNotes = require('./notes');

const msg = getNotes();

const greenMsg = chalk.green.bold.bgRed(msg);

console.log(greenMsg);
