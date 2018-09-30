
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
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = { Todo: Todo }    //or jsut {Todo}