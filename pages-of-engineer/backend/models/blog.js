// backend/routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Tüm blog yazılarını listele
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni blog yazısı ekle
router.post('/', async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    image: req.body.image,
  });

  try {
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
