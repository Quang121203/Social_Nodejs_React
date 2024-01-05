const userServices = require('../services/userServices');
const postServices = require('../services/postServices');


const createPost = async (req, res) => {
    console.log(req.body);
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
        if (+post.userID !== +req.body.userID) {
            return res.status(200).json({
                EC: 1,
                EM: 'you can only delete your post',
                DT: ''
            })
        }
        await postServices.deletePost(req.params.id);
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
        const user = await userServices.findUserById(req.body.userID);
        if (!post) {
            return res.status(200).json({
                EC: 1,
                EM: "this post don't exist",
                DT: ''
            })
        }

        if (!user) {
            return res.status(200).json({
                EC: 1,
                EM: "this user don't exist",
                DT: ''
            })
        }

        let likes = post.like;

        if (likes.includes(req.body.userID)) {
            likes = likes.filter((id) => {
                return id != +req.body.userID
            })
            await postServices.updatePost({ like: likes }, req.params.id);
            return res.status(200).json({
                EC: 0,
                EM: "unlike this post successfully",
                DT: ''
            })
        }

        likes.push(req.body.userID);
        await postServices.updatePost({ like: likes }, req.params.id);
        return res.status(200).json({
            EC: 0,
            EM: "like this post successfully",
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

const getPostTimeline = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.id);
        const postUser = await postServices.getPostTimeline(req.params.id);

        let postFriendUser = [];
        postFriendUser = postFriendUser.concat( postUser.Posts);
        
        const promises = user.followings.map(async (item) => {
            const post = await postServices.getPostTimeline(item);
            return post.Posts;
        });
        
        const results = await Promise.all(promises);

        //postUser.Posts.map(item => postFriendUser.push(item.id));
        postFriendUser = postFriendUser.concat( results);
        postFriendUser = postFriendUser.concat( postUser.Posts);

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

module.exports = {
    createPost, updatePost, deletePost, getPostTimeline,
    likePost
};