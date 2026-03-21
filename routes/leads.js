const express = require('express');
const router = express.Router();

const { getLeads, 
  createLead, 
  updateLead, 
  deleteLead 


} = require('../controllers/leadController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getLeads);
router.post('/', authMiddleware, createLead);
router.put('/:id', authMiddleware, updateStatus);
router.delete('/:id', authMiddleware, deleteLead);

module.exports = router;