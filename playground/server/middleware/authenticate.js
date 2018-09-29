//Middleware
const { User } = require('../model/user');

var authenticate = (req, resp, next) => {
    var token = req.header('x-auth');

    User.findByToken(token)
        .then(user => {
            if (user) {
                req.user = user;
                req.token = token;
                next();
            } else {
                return Promise.reject();
            }
        }).catch(err => {
            resp.status(401).send(err);
        });
}

module.exports = { authenticate };