const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/users', userRoutes);

module.exports = router;