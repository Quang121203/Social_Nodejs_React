var jwt = require('jsonwebtoken');

const createToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    var token = jwt.sign(payload, secret);
    return token
}

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
    } catch (err) {
        console.log(err);
    }
    return decoded;
}

module.exports = { createToken, verifyToken }