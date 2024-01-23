const conversationServices = require('../services/conversationServices');
const userServices = require('../services/userServices');

const createConversation = async (req, res) => {
    console.log(req.body);
    try {
        const user1 = await userServices.findUserById(req.body.userID1);
        const user2 = await userServices.findUserById(req.body.userID2);
        if (!user1 || !user2) {
            return res.status(200).json({
                EC: 1,
                EM: 'user not found',
                DT: ''
            })
        }

        let reversation = await conversationServices.findConversation2User(user1.id, user2.id);

        if (reversation) {
            return res.status(200).json({
                EC: 1,
                EM: 'conversation have exits',
                DT: reversation
            })
        }

        reversation = await conversationServices.createConversation(req.body);

        return res.status(200).json({
            EC: 0,
            EM: 'create successfully',
            DT: reversation
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })

    }
}

const findConversation2User = async (req, res) => {
    try {
        const user1 = await userServices.findUserById(req.body.userID1);
        const user2 = await userServices.findUserById(req.body.userID2);

        if (!user1 || !user2) {
            return res.status(200).json({
                EC: 1,
                EM: 'user not found',
                DT: ''
            })
        }

        const reversation = await conversationServices.findConversation2User(user1.id, user2.id);

        if (reversation) {

            return res.status(200).json({
                EC: 0,
                EM: '',
                DT: reversation
            })
        }

        return res.status(200).json({
            EC: 1,
            EM: 'conversation not found',
            DT: ''
        })

    } catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const findConversation1User = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.id);
        if (!user) {
            return res.status(200).json({
                EC: 1,
                EM: 'user not found',
                DT: ''
            })
        }

        const reversation = await conversationServices.findConversation1User(user.id);

        if (reversation) {

            return res.status(200).json({
                EC: 0,
                EM: '',
                DT: reversation
            })
        }

        return res.status(200).json({
            EC: 1,
            EM: 'conversation not found',
            DT: ''
        })

    } catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

module.exports = { createConversation, findConversation2User, findConversation1User }