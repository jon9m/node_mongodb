const { ObjectID } = require('mongodb');

var { mongoose } = require('./server/db/mongoose');
var { Todo } = require('./server/model/todo');

var id = '5bae1e391f3d332388e2bcf9';

//Id validation
if (!ObjectID.isValid(id)) {
    console.log('id is not valid!');
} else {
    Todo.find({                     //Returns array
        _id: id
    }).then(todos => {
        console.log(todos);
    }).catch(err => {
        console.log(err);
    });

    Todo.findById(id).then(todos => { //No _id is needed. Returns one object
        console.log(todos);
    }).catch(err => {
        console.log(err);
    });
}

Todo.findOne({                  //Returns one object
    text: 'this is from postman'
}).then(todos => {
    console.log(todos);
}).catch(err => {
    console.log(err);
});


