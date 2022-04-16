const mongoose = require("mongoose");

// Post Url and warning avoidance configuration
const url = "mongodb://localhost:27017/PostDB";
const option = { useNewUrlParser: true, useUnifiedTopology: true }
let post = null; 

const PostDB = async () => {
    if(post) { return post }
    try {
        await mongoose.connect(url, option);
        const PostSchema = mongoose.Schema({
            author: {type: String, required: true},
            title: {type: String, required: true},
            content: {type: String, required: true},
            createdAt: {type: String, required: true}
        });
        post = mongoose.model("Post", PostSchema);
        return post;
    } catch (error) { 
        return false;
    }
}

module.exports = PostDB;