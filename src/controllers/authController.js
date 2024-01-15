const userServices = require('../services/userServices');
const tokenService = require('../services/tokenServices');

const login = async (req, res) => {
    try {
        const checkUser = await userServices.getUser(req.body.email);
        if (!checkUser) {
            return res.status(200).json({
                EC: 1,
                EM: "email dont have exits",
                DT: ''
            })
        }

        const checkPass = userServices.checkPass(req.body.password, checkUser.password);
        if (checkPass) {
            const token = tokenService.createToken({ user: checkUser });

            res.cookie('jwt', token, { httpOnly: true }, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });
            
            return res.status(200).json({
                EC: 0,
                EM: "login success",
                DT: checkUser
            })
        }

        return res.status(200).json({
            EC: 1,
            EM: "password not right",
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

const register = async (req, res) => {
    try {
        const checkEmail = await userServices.getUser(req.body.email);

        if (checkEmail) {
            return res.status(200).json({
                EC: 1,
                EM: "email have exits",
                DT: ''
            })
        }

        req.body.password = userServices.hashPass(req.body.password);
        await userServices.createUser(req.body);

        return res.status(200).json({
            EC: 0,
            EM: "register success",
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

module.exports = { login, register };