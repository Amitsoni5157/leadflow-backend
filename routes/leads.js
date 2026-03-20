const express = require('express');
const router = express.Router();

const {
  createLead,
  getLeads,
  updateStatus
} = require('../controllers/leadController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getLeads);
router.post('/', authMiddleware, createLead);
router.put('/:id', authMiddleware, updateStatus);

module.exports = router;