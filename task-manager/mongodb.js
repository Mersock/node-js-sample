// CRUD create read delete
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'knz',
    //     age: 26
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }            

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Ken',
    //         age: 28
    //     },
    //     {
    //         name: 'Hel',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops);
    // })

    db.collection('tasks').insertMany([
        {
            description:'read',
            completed:true
        }
    ],(error,result) => {
        if(error){
            return console.log('Unable to insert document')
        }

        console.log(result.ops);
    })
});

