
const express = require('express');
const router = express.Router();
const documentVersionController = require('../controllers/documentVersionController');
const { authenticate } = require('../middleware/authMiddleware');

router.put('/documentRoute/:id',authenticate,documentVersionController.updateDocumentVersion);
router.put('/documentRoute/revert/:version/:id',authenticate, documentVersionController.DocumentRevertRoute);

module.exports = router;