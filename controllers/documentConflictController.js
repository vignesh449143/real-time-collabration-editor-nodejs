// controllers/documentController.js
const DocumentConflict = require('../models/documentConflictExample');
const Edit = require('../models/edit');

const updateDocument = async (req, res) => {
  const { documentId, userId, changes } = req.body;

  try {
    const document = await DocumentConflict.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Get the latest version of the document
    const currentVersion = document.version;

    // Create a new edit record
    const edit = await Edit.create({
      documentId,
      userId,
      changes,
    });

    // Check for conflicts
    if (currentVersion !== req.body.version) {
      return res.status(409).json({
        message: 'Conflict detected',
        data: {
          latestVersion: currentVersion,
          yourChanges: changes,
          latestChanges: document.content,
        },
      });
    }

    // If no conflict, apply the changes and increment the version
    document.content = changes.content;
    document.version += 1;
    await document.save();

    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  updateDocument,
};
