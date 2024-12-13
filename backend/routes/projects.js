const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')
const jwt = require('jsonwebtoken');

// Middleware to check if the user is an admin or superAdmin
/*const isAdmin = (req, res, next) => {
  if (req.user.role !== 'superAdmin' || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};*/

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new project
router.post('/', auth, isAdmin, upload.single('image'), async (req, res) => {
  delete req.body._id
  console.log(req.body)
  const userId = req.user.id
  const { appUrl, title, tecno, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  try {
    const project = new Project({ imageUrl, appUrl, title, tecno, description, userId });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.log('Cannot create new project see backend route')
    res.status(400).json({ error: err.message });
  }
});

// Update a project
router.patch('/:id', auth, isAdmin, upload.single('image'), async (req, res) => {
  const userId = req.user.id
  const { appUrl, title, tecno, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { imageUrl, appUrl, title, tecno, description, userId }, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a project
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
