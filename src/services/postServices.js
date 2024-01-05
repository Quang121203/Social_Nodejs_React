const db = require("../models/index.js");

const createPost = async (post) => {
    return await db.Post.create(post);
}

const getPost = async (id) => {
    const post = await db.Post.findOne({ where: { id } });
    if (post === null) {
        return false;
    } else {
        return post;
    }
}

const updatePost = async (post, id) => {
    return await db.Post.update({ ...post, id: id }, {
        where: {
            id
        }
    });
}

const deletePost = async (id) => {
    return await db.Post.destroy({
        where: {
            id
        }
    });
}

const getPostTimeline = async (userID) => {
    return await db.User.findOne({
        where: { id: userID },
        include: db.Post
    });
}

module.exports = {
    createPost, getPost, updatePost, deletePost,getPostTimeline
};