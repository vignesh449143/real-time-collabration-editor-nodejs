// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentConflictController = require('../controllers/documentConflictController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/documentConflictController/:id/edit', authenticate, documentConflictController.updateDocument);

module.exports = router;
