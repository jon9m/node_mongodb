var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.URI = 'localhost';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.URI = 'localhost';
} else {
    process.env.PORT = 3000;
    process.env.URI = 'localhost';
}

const port = process.env.PORT;

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./model/todo');
var { User } = require('./model/user');
var { authenticate } = require('./middleware/authenticate');

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

//Update
expressApp.patch('/todos/:id', (req, resp) => {
    var id = req.params.id;

    //Only accept text and completed values from the req values passed
    var body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id)) {

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        //new same as return Original false
        Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(todo => {
            if (todo) {
                resp.send(todo);
            } else {
                resp.status(400).send();
            }
        }).catch(err => {
            resp.status(400).send(e);
        });
    } else {
        resp.status(400).send("Invalid ID");
    }
});

// ------------------------------------------------
expressApp.post('/users', (req, resp) => {

    var body = _.pick(req.body, ['email', 'password']);
    var newUser = new User(body);

    //Save to DB
    newUser.save()
        .then((user) => {
            console.log('Saved !', user);

            return newUser.generateAuthToken();

            // resp.send(user);
            //mongoose.disconnect();  //TODO
        }).then(token => {
            //x-auth is custom header
            resp.header('x-auth', token).send(newUser);
        })
        .catch(err => {
            console.log('Error saving', err);
            resp.status(400).send(err);
        });
});

//Login
expressApp.post('/users/login', (req, resp) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            console.log('resolved');
            return user.generateAuthToken().then(token => {
                resp.header('x-auth', token).send(user);
            });
        }).catch((err) => {
            console.log('rejected');
            resp.status(400).send(err);
        });
});

//Middleware
// var authenticate = (req, resp, next) => {
//     var token = req.header('x-auth');

//     User.findByToken(token)
//         .then(user => {
//             if (user) {
//                 req.user = uer;
//                 req.token = tiken;
//                 next();
//             } else {
//                 return Promise.reject();
//             }
//         }).catch(err => {
//             resp.status(401).send(err);
//         });
// }

expressApp.get('/users/me', authenticate, (req, resp) => {
    // var token = req.header('x-auth');

    // User.findByToken(token)
    //     .then(user => {
    //         if (user) {
    //             resp.send(user);
    //         } else {
    //             return Promise.reject();
    //         }
    //     }).catch(err => {
    //         resp.status(401).send(err);
    //     });

    resp.send(req.user);
});

expressApp.listen(port, () => {
    console.log("Started on port 3000");
});