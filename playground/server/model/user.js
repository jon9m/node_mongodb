
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//Override a method
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

//Add a new method
UserSchema.methods.generateAuthToken = function () {  //Don't use arrow functions as we need to use 'this'
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access: access }, 'secret_value').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(result => {   //Return the promise
        return token;
    }).catch(err => {
        console.log(err);
    });
};

//Create a model
var User = mongoose.model('User', UserSchema);

module.exports = { User };