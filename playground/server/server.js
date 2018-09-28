//load mongoose
var mongoose = require('mongoose');

//use promises in mongoose instead of callbacks
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

//Create a model
var Todo = mongoose.model('Todo', {  //Constructor function
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'cook dinner',
    completed: false
});

//Save to DB

newTodo.save()
    .then((doc) => {
        console.log('Saved !', doc);
    })
    .catch(err => {
        console.log('Error saving', err);
    });









