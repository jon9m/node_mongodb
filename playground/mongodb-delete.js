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

    //DeleteMany
    // db.collection('Todos').deleteMany({ text: "something to do" })
    //     .then((result) => {
    //         console.log("------------DeleteMany------------");
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //DeleteOne - only the forst one matches the criteria
    // db.collection('Todos').deleteOne({ text: "something to do" })
    //     .then((result) => {
    //         console.log("------------DeleteOne------------");
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //FindOneAndDelete
    // db.collection('Todos').findOneAndDelete({ text: "something to do 2" })
    //     .then((result) => {
    //         console.log("------------FindOneAndDelete------------");
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({ text: "something to do 3" }, { $set: { text: "something to do updated 3" } })
    //     .then((result) => {
    //         console.log("------------findOneAndUpdate------------");
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //findOneAndReplace
    db.collection('Todos').findOneAndReplace({ text: "something to do 1" }, { text: "something to do replaced 1" })
        .then((result) => {
            console.log("------------findOneAndReplace------------");
            console.log(JSON.stringify(result, undefined, 2));
        })
        .catch((err) => {
            console.log(err);
        });

    //FindOneAndDelete

    //closes the connection to mongodb server
    //client.close();  //Close only after promise completed - FIXME !
});