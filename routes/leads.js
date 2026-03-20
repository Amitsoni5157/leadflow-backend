const express = require('express');
const router = express.Router();

const {
  createLead,
  getLeads,
  updateStatus
} = require('../controllers/leadController');

const authMiddleware = require('../middleware/authMiddleware');

// 🔥 PROTECT ROUTES
router.post('/', authMiddleware, createLead);
router.get('/', authMiddleware, getLeads);
router.put('/:id', authMiddleware, updateStatus);

module.exports = router;