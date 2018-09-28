//load mongoose
var mongoose = require('mongoose');

//use promises in mongoose instead of callbacks
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose: mongoose };