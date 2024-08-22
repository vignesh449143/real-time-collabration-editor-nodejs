const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/authMiddleware');
// Route to save a chat message
router.post('/chats', authenticate, chatController.saveChatMessage);

// Route to get chat messages for a document
router.get('/chats/:documentId', authenticate, chatController.getChatMessages);

module.exports = router;
