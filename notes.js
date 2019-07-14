const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'My notes....';


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    } else {
        console.log("Note title taken!.");
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const findNotes = notes.filter(note => note.title !== title);

    // console.log(findNotes);
    if (notes.length > findNotes.length) {
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(findNotes);
    } else {
        console.log(chalk.bgRed('No note Found!'));
    }
};

const saveNotes = notes => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
};

module.exports = {
    getNotes,
    addNote,
    removeNote
};