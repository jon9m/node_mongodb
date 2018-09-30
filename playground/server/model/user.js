
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


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

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'secret_value');
    } catch (err) {
        //console.log(err);

        // return new Promise((resolve, reject) => {
        //     reject("User validation failed!");
        // });

        Promise.reject("User validation failed!"); //same
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,   //quotes are required when . in the value
        'tokens.access': 'auth'
    });
};

//pre post hooks - middleware
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

//Create a model
var User = mongoose.model('User', UserSchema);

module.exports = { User };