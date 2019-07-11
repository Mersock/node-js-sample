const chalk = require('chalk');
const notes = require('./notes');
const yargs = require('yargs');


//version
yargs.version('1.1.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Description note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
        console.log('Add a new note!', argv.title, argv.body);
    }
});

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removeing the note!')
    }
});

//create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        console.log('List the note!')
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Read a note')
    }
});

//add ,remove,read,list

yargs.parse();

// console.log(yargs.argv);
