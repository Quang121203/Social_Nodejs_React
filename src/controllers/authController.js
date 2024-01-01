const userServices = require('../services/userServices');


const login = (req, res) => {
    res.send('Birds home pageasasdd')
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const checkEmail =await userServices.checkEmail(req.body.email);

        if (checkEmail) {
            return res.status(200).json({
                EC: -1,
                EM: "email have exits",
                DT: ''
            })
        }

        await userServices.createUser(req.body);

        return res.status(200).json({
            EC: 0,
            EM: "success",
            DT: ''
        })

    } catch (err) {
        return res.status(404).json({
            EC: 1,
            EM: err,
            DT: ''
        })
    }
}

module.exports = { login, register };