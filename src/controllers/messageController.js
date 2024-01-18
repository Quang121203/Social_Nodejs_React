const messageServices = require('../services/messageServices');


const createMessage = async (req, res) => {
    console.log(req.body)
    try {
        const data = await messageServices.createMessage(req.body);
        return res.status(404).json({
            EC: 0,
            EM: 'create successfully',
            DT: data
        })
    } catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const getMessage = async (req, res) => {
    try {
        const messages = await messageServices.getMessage(req.params.id);
        return res.status(200).json({
            EC: 0,
            EM: '',
            DT: messages
        })
    } catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}


module.exports = {
    createMessage, getMessage
};