
var mongoose = require('mongoose');

//Create a model
var Todo = mongoose.model('Todo', {  //Constructor function
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = { Todo: Todo }    //or jsut {Todo}