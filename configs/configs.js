const PostDB = require("../models/PostDB.js");

const home = (req, res) => {
    return res.status(200).json({ message: "Home Route" });
}
const getPosts = async (req, res) => {
    try {
        const Post = await PostDB();
        const posts = await Post.find({});
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(400).json({ error: "Try again later, something went wrong." })
    }
}
const getPost = async (req, res) => {
    const id = req.params.id;
    if(!id){return res.status(400).json({error: "Post id is required."})}
    try {
        const Post = await PostDB();
        const post = await Post.findById(id);
        if(post){
            return res.status(200).json({ post });
        } else {
            return res.status(400).json({ error: "Post does not exit." })
        }
    } catch (error) {
        return res.status(500).json({error: "Something went wrong, try again later."});
    }
}
const addPost = async (req, res) => {
    const d = new Date();
    const createdAt = `${d.toDateString()}, ${d.toLocaleTimeString()}`;
    const { author, title, content } = req.body;
    if((!author || !author.length > 0) || (!title || !title.length > 0) || 
        (!content || !content.length > 0)){
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const Post = await PostDB();
        const post = await Post.create({author, title, content, createdAt});
        return res.status(200).json({message: "Post added successfully.", post});
    } catch (error) {
        return res.status(500).json({error: "Something went wrong, try again later."});
    }
}
const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if(!id){ return res.status(400).json({ error: "Specify the post to be edited." }) }
    try {
        const Post = await PostDB();
        const postResponse = await Post.findById(id);
        if(!postResponse){ return res.status(400).json({ error: "No such post." }) }
        await Post.findByIdAndUpdate(id, {
            title: title || postResponse.title,
            content: content || postResponse.content
        });
        return res.status(200).json({message: "Post updated successfully."});
    } catch (error) {
        return res.status(400).json({ error: "Error while updating post." })
    }
}
const deletePost = async (req, res) => {
    const id = req.params.id;
    if(!id) { return res.status(400).json({ error: "No post id provided." }) }
    try {
        const Post = await PostDB();
        const post = await Post.findById(id);
        if(!post){ return res.status(400).json({ error: "No post with such specification." })}
        await Post.findByIdAndDelete(id);
        return res.status(200).json({message: "Post deleted successfully."});
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong while deleting post." });
    }
}

module.exports = {
    home,
    getPosts,
    getPost,
    addPost,
    deletePost,
    updatePost
}