const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Projeleri al
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni proje ekle
router.post('/', async (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    image: req.body.image,
  });

  try {
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
