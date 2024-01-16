const userServices = require('../services/userServices');
const postServices = require('../services/postServices');
const { unlink } = require('node:fs');


const createPost = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.body.userID);

        if (!user) {
            return res.status(200).json({
                EC: 1,
                EM: 'user not found',
                DT: ''
            })
        }
        await postServices.createPost(req.body);
        return res.status(200).json({
            EC: 0,
            EM: 'upload post successful',
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

const updatePost = async (req, res) => {
    try {
        const post = await postServices.getPost(req.params.id);
        if (+post.userID !== +req.body.userID) {
            return res.status(200).json({
                EC: 1,
                EM: 'you can only update your post',
                DT: ''
            })
        }
        await postServices.updatePost(req.body, req.params.id);
        return res.status(200).json({
            EC: 0,
            EM: 'update post successful',
            DT: ''
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

const deletePost = async (req, res) => {
    try {
        const post = await postServices.getPost(req.params.id);
        if (+post.userID !== +req.user.id) {
            return res.status(200).json({
                EC: 1,
                EM: 'you can only delete your post',
                DT: ''
            })
        }
        await postServices.deletePost(req.params.id);

        if (post.img) {
            unlink(`public/${post.img}`, (err) => {
            });
        }

        return res.status(200).json({
            EC: 0,
            EM: 'delete post successful',
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

const likePost = async (req, res) => {
    try {
        const post = await postServices.getPost(req.params.id);
        if (!post) {
            return res.status(200).json({
                EC: 1,
                EM: "this post don't exist",
                DT: ''
            })
        }

        if (!req.user) {
            return res.status(200).json({
                EC: 1,
                EM: "this user don't exist",
                DT: ''
            })
        }

        let likes = post.like;

        if (likes.includes(req.user.id.toString())) {
            likes = likes.filter((id) => {
                return id != +req.user.id
            })
            await postServices.updatePost({ like: likes }, req.params.id);
            return res.status(200).json({
                EC: 0,
                EM: "unlike this post successfully",
                DT: ''
            })
        }

        likes.push(req.user.id);
        await postServices.updatePost({ like: likes }, req.params.id);
        return res.status(200).json({
            EC: 0,
            EM: "like this post successfully",
            DT: ''
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

const getPostTimeline = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.id);
        const postUser = await postServices.getPostTimeline(req.params.id);

        const promises = user.followings.map(async (item) => {
            const post = await postServices.getPostTimeline(item);
            return post.Posts;
        });

        const results = await Promise.all(promises);

        const postFriendUser = [].concat(...results, postUser.Posts);

        return res.status(200).json({
            EC: 0,
            EM: 'get post successful',
            DT: postFriendUser
        })
    } catch (err) {
        return res.status(404).json({
            EC: -1,
            EM: err,
            DT: ''
        })
    }
}

const getPost = async (req, res) => {
    try {
        const postUser = await postServices.getPostTimeline(req.params.id);

        return res.status(200).json({
            EC: 0,
            EM: 'get post successful',
            DT: postUser.Posts
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
    createPost, updatePost, deletePost, getPostTimeline, getPost,
    likePost
};