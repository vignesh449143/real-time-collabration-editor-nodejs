// routes/documents.js (Update route)
const DocumentVersion = require('../models/documentVersion');


exports.updateDocumentVersion = async (req, res) => {
  const { title, content } = req.body;

  try {
    const document = await Document.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
    if (!document) return res.status(404).json({ error: 'Document not found' });

    // Save the current version before updating
    await DocumentVersion.create({
      documentId: document.id,
      title: document.title,
      content: document.content,
      version: (await DocumentVersion.count({ where: { documentId: document.id } })) + 1,
    });

    document.title = title;
    document.content = content;
    await document.save();

    res.json({ message: 'Document updated successfully', document });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document', details: error });
  }
};

exports.DocumentRevertRoute = async (req, res) => {
    try {
      const document = await Document.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
      if (!document) return res.status(404).json({ error: 'Document not found' });
  
      const version = await DocumentVersion.findOne({
        where: { documentId: document.id, version: req.params.version }
      });
      if (!version) return res.status(404).json({ error: 'Version not found' });
  
      document.title = version.title;
      document.content = version.content;
      await document.save();
  
      res.json({ message: 'Document reverted to version ' + req.params.version, document });
    } catch (error) {
      res.status(500).json({ error: 'Failed to revert document', details: error });
    }
  };
  