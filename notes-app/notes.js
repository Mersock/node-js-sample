const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'My notes....';

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title);
    });
};

const readNotes = (title) => {
    const notes = loadNotes();
    const showNote = notes.find(note => note.title === title);

    if (showNote) {
        console.log(chalk.bgGreen(showNote.title));
        console.log(showNote.body);
    } else {
        console.log(chalk.bgRed("Note title Not Found!"));
    }

};

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter(note => note.title === title);
    const duplicateNote = notes.find(note => note.title === title);

    // console.log(duplicateNote);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        // saveNotes(notes);
        console.log("New Note Added!.");
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
    listNotes,
    readNotes,
    addNote,
    removeNote
};