const express = require('express');
const router = express.Router();

// Mock user data
const users = {
  1: { id: 1, name: 'John Doe', email: 'john@example.com' },
  2: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
};

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// PUT update user
router.put('/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    users[req.params.id] = { ...user, ...req.body };
    res.json(users[req.params.id]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// GET all users
router.get('/', (req, res) => {
  res.json(Object.values(users));
});

// POST create user
router.post('/', (req, res) => {
  const newId = Math.max(...Object.keys(users)) + 1;
  const newUser = { id: newId, ...req.body };
  users[newId] = newUser;
  res.status(201).json(newUser);
});

module.exports = router;