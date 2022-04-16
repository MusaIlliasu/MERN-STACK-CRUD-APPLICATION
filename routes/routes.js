const express = require("express");
const {
    home, getPosts, getPost, addPost, deletePost, updatePost
} = require("../configs/configs.js");

const router = express.Router();

// Routes
router.get("/", home);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", addPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.get("*", (req, res) => res.redirect("/"));

module.exports = router;