var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

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


//Get all
expressApp.get('/todos', (req, resp) => {
    Todo.find().then(todos => {
        resp.send(todos);
    }).catch(err => {
        resp.status(400).send(e);
    });
});

//Get one
expressApp.get('/todos/:id', (req, resp) => {
    var id = req.params.id;

    if (ObjectID.isValid(id)) {
        Todo.findById(id).then(todo => {
            if (todo) {
                resp.send(todo);
            } else {
                resp.send({});
            }
        }).catch(err => {
            resp.status(400).send(e);
        });
    } else {
        resp.status(400).send("Invalid ID");
    }
});

//Delete all
expressApp.delete('/todos', (req, resp) => {
    var id = req.params.id;

    Todo.deleteMany().then(todo => {
        if (todo) {
            resp.send(todo);
        } else {
            resp.send({});
        }
    }).catch(err => {
        resp.status(400).send(e);
    });
});

//Delete by id
expressApp.delete('/todos/:id', (req, resp) => {
    var id = req.params.id;

    if (ObjectID.isValid(id)) {
        Todo.findByIdAndDelete(id).then(todo => {
            if (todo) {
                resp.send(todo);
            } else {
                resp.send({});
            }
        }).catch(err => {
            resp.status(400).send(e);
        });
    } else {
        resp.status(400).send("Invalid ID");
    }
});

expressApp.listen(3000, () => {
    console.log("Started on port 3000");
});