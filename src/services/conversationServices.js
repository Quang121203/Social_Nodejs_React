const db = require("../models/index.js");
const { Op } = require('sequelize');


const createConversation = async (conversation) => {
    return await db.Conversation.create(conversation);
}

const findConversation2User = async (userID1, userID2) => {
    const conversation = await db.Conversation.findOne({
        where: {
            [Op.or]: [
                { userID1, userID2 },
                { userID1: userID2, userID2: userID1 }
            ]
        }
    });
    if (!conversation) {
        return false;
    }

    return conversation
}

const findConversation1User = async (userID) => {
    const conversation = await db.Conversation.findAll({
        where: {
            [Op.or]: [
                { userID1: userID },
                { userID2: userID }
            ]
        }
    });
    if (conversation.length <= 0) {
        return false;
    }

    return conversation
}

module.exports = { createConversation, findConversation1User, findConversation2User }