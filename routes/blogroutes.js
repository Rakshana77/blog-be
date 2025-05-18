const express = require("express");
const Blog = require("../models/Blog.js");
const User = require("../models/User.js");
const verifyToken = require("../middleware/authMiddleware.js");
const router = express.Router();

//get blog

router.get("/", verifyToken, async (req, res) => {
  try {
    const { category, author } = req.query;
    const filter = {};
    const escape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (category) filter.category = new RegExp(`^${escape(category)}$`, "i");
    if (author) filter.author = new RegExp(escape(author), "i");

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("GET /blogs error:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

//post blog
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, category, content, image } = req.body;

    //  fetch the current user
    const user = await User.findById(req.userId).select("name");
    if (!user) return res.status(404).json({ message: "User not found" });

    //  create the blog with the user's name
    const newBlog = new Blog({
      title,
      category,
      content,
      image,
      userId: req.userId,
      author: user.name,
      createdAt: new Date(),
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /blogs error:", err);
    res.status(500).json({ message: "Error creating blog" });
  }
});

//update blog
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    blog.title = req.body.title;
    blog.category = req.body.category;
    blog.content = req.body.content;
    blog.image = req.body.image;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error("PUT /blogs/:id error:", err);
    res.status(500).json({ message: "Error updating blog" });
  }
});

//delete blog
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleted)
      return res.status(403).json({ message: "Unauthorized or not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting blog" });
  }
});

// Get blogs by current user
router.get("/myblogs/user", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.userId });
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching user blogs" });
  }
});

module.exports = router;
