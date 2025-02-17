// routes/posts.js
const router = require('express').Router();
const Post = require('../models/Post');
const verifyToken = require('../middlewares/verifyToken');

// Create a new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      postedBy: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});

// Retrieve posts (for feed, etc.)
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().populate('postedBy', 'username profileImage');
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports = router;
