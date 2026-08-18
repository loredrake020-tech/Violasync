const express = require('express');
const router = express.Router();

// Mock data
const mockData = [
  { id: 1, title: 'Item 1', description: 'First item' },
  { id: 2, title: 'Item 2', description: 'Second item' },
  { id: 3, title: 'Item 3', description: 'Third item' },
];

// GET all data
router.get('/', (req, res) => {
  res.json(mockData);
});

// GET data by ID
router.get('/:id', (req, res) => {
  const item = mockData.find(d => d.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

// POST create data
router.post('/', (req, res) => {
  const newItem = {
    id: mockData.length + 1,
    ...req.body,
  };
  mockData.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;