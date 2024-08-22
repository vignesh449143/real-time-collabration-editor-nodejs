const db = require('../models');
const Document = db.Document;

// Create a new document
exports.createDocument = async (req, res) => {
  const { title, content } = req.body;
  try {
    console.log("body:", req.body );
    const document = await Document.create({
      title,
      content,
      ownerId: req.user.id,
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({ where: { ownerId: req.user.id } });
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({ where: { id: req.params.id, ownerId: req.user.id} });
    res.json(document);
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  const { title, content } = req.body;
  try {
    const document = await Document.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
    if (document) {
      document.title = title;
      document.content = content;
      await document.save();
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ where: { id: req.params.id, ownerId: req.user.id} });
    if (document) {
      await document.destroy();
      res.status(200).json({ message: 'Document deleted' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
