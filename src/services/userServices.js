const db = require("../models/index.js");


//false is dont exits
const checkEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    if (user === null) {
        return false;
    } else {
        return true;
    }
}

const createUser = async (user) => {
    return await db.User.create(user);
}

module.exports = {checkEmail,createUser };