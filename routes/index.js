const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');
const documentRoutes = require('./documentRoutes');
const documentVersionRoute = require('./documentVersionRoute');
const documentConflictRoutes = require('./documentConflictRoutes');
const chatRoutes = require('./chatRoutes');

// Define base paths for each route
router.use('/user', userRoutes);
router.use('/document', documentRoutes);
router.use('/documentVersion', documentVersionRoute);
router.use('/documentConflict', documentConflictRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
