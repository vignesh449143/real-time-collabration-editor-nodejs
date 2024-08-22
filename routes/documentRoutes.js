const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/documents',authenticate,documentController.createDocument);
router.get('/documents',authenticate, documentController.getDocuments);
router.get('/documents/:id', authenticate,documentController.getDocumentById);
router.put('/documents/:id', authenticate, documentController.updateDocument);
router.delete('/documents/:id',authenticate, documentController.deleteDocument);

module.exports = router;
