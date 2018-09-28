// //load mongoose
// var mongoose = require('mongoose');

// //use promises in mongoose instead of callbacks
// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/TodoApp');

// //Create a model
// var Todo = mongoose.model('Todo', {  //Constructor function
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./model/todo');

var newTodo = new Todo({
    text: 'cook dinner',
    completed: false
});

//Save to DB

newTodo.save()
    .then((doc) => {
        console.log('Saved !', doc);
        mongoose.disconnect();  //TODO
    })
    .catch(err => {
        console.log('Error saving', err);
    });









