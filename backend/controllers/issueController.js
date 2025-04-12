const Issue = require('../models/Issue');

exports.createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;

    const newIssue = new Issue({ title, description, imageUrl });
    await newIssue.save();

    res.status(201).json({ message: 'Issue reported', issue: newIssue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
