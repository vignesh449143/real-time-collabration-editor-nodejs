const Chat = require('../models/chat');

// Save a new chat message
const saveChatMessage = async (req, res) => {
  const { documentId, message } = req.body;

  try {
    const chat = await Chat.create({
      document_id: documentId,
      user_id: req.user.id,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save chat message', error });
  }
};

// Get chat messages for a specific document
const getChatMessages = async (req, res) => {
  const { documentId } = req.params;

  try {
    const chats = await Chat.findAll({
      where: { document_id: documentId },
      order: [['created_at', 'ASC']]
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve chat messages', error });
  }
};

module.exports = {
  saveChatMessage,
  getChatMessages,
};
