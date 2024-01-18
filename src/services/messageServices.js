const db = require("../models/index.js");

const createMessage = async (message) => {
    return await db.Message.create(message);
}

const getMessage = async (conversationID) => {
    return await db.Message.findAll({ where: {conversationID} });
}

module.exports = {
    createMessage,getMessage
};