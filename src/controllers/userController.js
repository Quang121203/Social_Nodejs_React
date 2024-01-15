const userServices = require('../services/userServices');
const { unlink } = require('node:fs');
const tokenService = require('../services/tokenServices');

const updateUser = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.body.id);

        if (+req.params.id !== +req.body.id && !user.isAdmin) {
            return res.status(401).json({
                EC: 1,
                EM: "you can't update orther user",
                DT: ''
            })
        }

        if (req.body.password) {
            req.body.password = userServices.hashPass(req.body.password);
        }

        if (req.body.coverPicture && user.coverPicture) {
            unlink(`public/${user.coverPicture}`, (err) => {
            });
        }

        if (req.body.profilePicture && user.profilePicture) {
            unlink(`public/${user.profilePicture}`, (err) => {
            });
        }

        await userServices.updateUser(req.body, req.params.id);
        const newUser = await userServices.findUserById(req.body.id);

        const token = tokenService.createToken({ user: newUser });

        res.cookie('jwt', token, { httpOnly: true }, {
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        });

        return res.status(200).json({
            EC: 0,
            EM: "update successful",
            DT: ''
        })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }

}

const deleteUser = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.body.id);

        if (req.params.id !== req.body.id && !user.isAdmin) {
            return res.status(401).json({
                EC: 1,
                EM: "you can't delete orther user",
                DT: ''
            })
        }

        await userServices.deleteUser(req.params.id);

        return res.status(200).json({
            EC: 0,
            EM: "delete successful",
            DT: ''
        })
    }
    catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.id);
        if (!user) {
            return res.status(200).json({
                EC: 1,
                EM: "user dont exist",
                DT: ''
            })
        }

        return res.status(200).json({
            EC: 0,
            EM: '',
            DT: user
        })
    }
    catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const getUserCurrent = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(200).json({
                EC: 1,
                EM: "user dont exist",
                DT: ''
            })
        }

        return res.status(200).json({
            EC: 0,
            EM: '',
            DT: req.user
        })
    }
    catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const getUserByName = async (req, res) => {
    try {
        let users = await userServices.getAllUser();

        users = users.filter(user => user.username.includes(req.params.username));

        if (!users) {
            return res.status(200).json({
                EC: 1,
                EM: "user dont exist",
                DT: ''
            })
        }

        return res.status(200).json({
            EC: 0,
            EM: '',
            DT: users
        })
    }
    catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const follow = async (req, res) => {
    try {
        if (req.body.id !== req.params.id) {
            const currentUser = await userServices.findUserById(req.body.id);
            const user = await userServices.findUserById(req.params.id);

            if (currentUser.followings.includes(req.params.id.toString())) {
                return res.status(200).json({
                    EC: 1,
                    EM: "you already follow this user",
                    DT: ''
                })
            }

            if (!user) {
                return res.status(200).json({
                    EC: 1,
                    EM: "this user not found",
                    DT: ''
                })
            }

            const followings = currentUser.followings;
            followings.push(user.id);

            const followers = user.followers;
            followers.push(currentUser.id);


            await userServices.updateUser({ followings }, currentUser.id);
            await userServices.updateUser({ followers }, user.id);

            return res.status(200).json({
                EC: 0,
                EM: "follow this user successfully",
                DT: ''
            })
        }

        return res.status(200).json({
            EC: 1,
            EM: "you can't follow yourself",
            DT: ''
        })
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const unfollow = async (req, res) => {
    try {
        if (req.body.id !== req.params.id) {
            const currentUser = await userServices.findUserById(req.body.id);
            const user = await userServices.findUserById(req.params.id);

            if (!currentUser.followings.includes(req.params.id.toString())) {
                return res.status(200).json({
                    EC: 1,
                    EM: "you already unfollow this user",
                    DT: ''
                })
            }

            if (!user) {
                return res.status(200).json({
                    EC: 1,
                    EM: "this user not found",
                    DT: ''
                })
            }

            let followings = currentUser.followings;
            followings = followings.filter((id) => {
                return id != +user.id
            })


            let followers = user.followers;
            followers = followers.filter((id) => {
                return id != +currentUser.id
            })

            await userServices.updateUser({ followings }, currentUser.id);
            await userServices.updateUser({ followers }, user.id);

            return res.status(200).json({
                EC: 0,
                EM: "unfollow this user successfully",
                DT: ''
            })
        }

        return res.status(200).json({
            EC: 1,
            EM: "you can't unfollow yourself",
            DT: ''
        })
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}
module.exports = {
    updateUser, deleteUser, getUser, getUserByName, getUserCurrent,
    follow, unfollow
};