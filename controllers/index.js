// Require the express router
const router = require('express').Router();

// Require the api and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use the api and home routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
