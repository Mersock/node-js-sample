const fs = require('fs');

// const book = {
//     title: 'this is title',
//     author: 'my name'
// };

// const bookJson = JSON.stringify(book);

//write file
// fs.writeFileSync('1-json.json', bookJson);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJson = dataBuffer.toString();
// const data = JSON.parse(dataJson);
// console.log(data);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const user = JSON.parse(dataJson);

user.name = 'knz';
user.age = 26;

const userJson = JSON.stringify(user);

fs.writeFileSync('1-json.json',userJson);