const { MongoClient, ObjectID } = require('mongodb');

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

    //Find all documents - returns a mongodb curser
    //using curser method toArray
    db.collection('Todos').find().toArray()
        .then((docs) => {
            console.log("------------Find all documents------------");
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log(err);
        });

    //Query the collection
    db.collection('Todos').find({ completed: true }).toArray()
        .then((docs) => {
            console.log("------------Query the collection by status------------");
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log(err);
        });

    //Query the collection by auto generated id
    db.collection('Todos').find({ _id: new ObjectID("5ba43dc7ba17a324047c8f4f") }).toArray()
        .then((docs) => {
            console.log("------------Query the collection by auto generated id------------");
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log(err);
        });

    //Query the collection for count
    db.collection('Todos').find().count()
        .then((docs) => {
            console.log("------------Query the collection for count------------");
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log(err);
        });


    //closes the connection to mongodb server
    client.close();  //Close only after promise completed - FIXME !
});