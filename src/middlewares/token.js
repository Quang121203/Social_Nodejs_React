const tokenService = require('../services/tokenServices')

const checkUser = (req, res, next) => {
    if(req.cookies && req.cookies.jwt){
        const decoded = tokenService.verifyToken(req.cookies.jwt);
        req.user = decoded.user;
        return next();
    }
    else{
        return res.status(403).json({
            EC: 1,
            EM: "you need login",
            DT: ''
        })
    }
}

module.exports = { checkUser }