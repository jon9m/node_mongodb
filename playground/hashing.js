const { SHA256 } = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message ${message}`);
console.log(`Hash ${hash}`);

var data = {
    id: 4
}

var token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + 'some_salt').toString()
}

//Change data - man in the midddle
token.data.id = 8;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(data) + 'some_salt').toString();
if (resultHash === token.hash) {
    console.log("Data was not changed");
} else {
    console.log("Data has been changed!");

}

// ---------------Using jsonwebtoken----------------

const jwt = require('jsonwebtoken');

data = {
    id: 10
};

var jsonwebtoken = jwt.sign(JSON.stringify(data), 'some_salt');
console.log(`jsonwebtoken ${jsonwebtoken}`);

var decodedtoken = jwt.verify(jsonwebtoken, 'some_salt');
console.log(`decodedtoken ${JSON.stringify(decodedtoken)}`);













