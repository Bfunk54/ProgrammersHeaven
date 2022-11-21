// Require all packages needed for the api index
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Create the routes for the api
router.use('/users', userRoutes);
router.use('/create-post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
