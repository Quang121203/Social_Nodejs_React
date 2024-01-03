const db = require("../models/index.js");
const bcrypt = require('bcrypt');

//false is dont exits
const getUser = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    if (user === null) {
        return false;
    } else {
        return user;
    }
}

const findUserById = async (id) => {
    const user = await db.User.findOne({ where: { id } });
    if (user === null) {
        return false;
    } else {
        return user;
    }
}

const hashPass = (pass) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newPass = bcrypt.hashSync(pass, salt);
    return newPass;
}

const checkPass = (pass, newPass) => {
    return bcrypt.compareSync(pass, newPass);
}

const createUser = async (user) => {
    return await db.User.create(user);
}

const updateUser = async (user, id) => {
    console.log("check user",user);
    return await db.User.update({ ...user, id: id }, {
        where: {
            id
        }
    });
}

const deleteUser = async (id) => {
    return await db.User.destroy({
        where: {
            id
        }
    });
}


module.exports = {
    hashPass, checkPass,
    getUser, createUser, findUserById, updateUser, deleteUser
};