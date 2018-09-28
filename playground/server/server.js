var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./model/todo');

var expressApp = express();

//middleware
expressApp.use(bodyParser.json());

//Create
expressApp.post('/todos', (req, resp) => {
    var newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    //Save to DB
    newTodo.save()
        .then((doc) => {
            console.log('Saved !', doc);

            resp.send(doc);

            //mongoose.disconnect();  //TODO
        })
        .catch(err => {
            console.log('Error saving', err);

            resp.status(400).send(err);
        });


});

expressApp.listen(3000, () => {
    console.log("Started on port 3000");
});