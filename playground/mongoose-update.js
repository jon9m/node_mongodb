const { ObjectID } = require('mongodb');

var { mongoose } = require('./server/db/mongoose');
var { Todo } = require('./server/model/todo');


Todo.findByIdAndRemove('5baee8aae8af8e17448daa15')             //Remove one by id
    .then(doc => {
        console.log(doc);
    }).catch(err => {
        console.log(err);
    });