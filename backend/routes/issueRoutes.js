const express = require('express');
const Issue = require('../models/Issue');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { image, location, department, dateTime, description } = req.body;

    if (!image || !location || !department || !dateTime || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newIssue = new Issue({ image, location, department, dateTime, description });
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    console.error('Issue save error:', err);
    res.status(500).json({ error: 'Failed to save issue' });
  }
});

router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error('Fetch issues error:', err);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

module.exports = router;
