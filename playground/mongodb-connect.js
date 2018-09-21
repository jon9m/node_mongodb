// const MongoClient = require('mongodb').MongoClient;

//Using objcet destructuring
const { MongoClient, ObjectID } = require('mongodb');
//ObjectID will create new IDs on th fly
// var obj = new ObjectID();
// console.log(obj);



MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    //failure    
    if (err) {
        console.log("Unable to connect to mongodb server");
        return; // stops rest of the function executoing
    }
    //Success
    console.log("connected to mongodb server");

    //will create a new DB if not exist
    let db = client.db('TodoApp');

    //create a collection and insert new document
    db.collection('Todos').insertOne({
        text: 'something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            console.log("Unable to insert to Todos", err);
            return;
        }
        //success
        console.log(JSON.stringify(result.ops, undefined, 2));  // ops attribute will contain all the documents
    });

    //create a collection and insert new document
    db.collection('Users').insertOne({
        //_id: 1234,             //Legal to add own id instead of generated one
        name: 'Sumanapala',
        age: 23,
        location: 'Anuradhapura'
    }, (err, result) => {
        if (err) {
            console.log("Unable to insert to Users", err);
            return;
        }
        //success
        console.log(JSON.stringify(result.ops, undefined, 2));  // ops attribute will contain all the documents
        console.log(result.ops[0]._id.getTimestamp());          // Get the timestamp at id created
    });

    //closes the connection to mongodb server
    client.close();
});