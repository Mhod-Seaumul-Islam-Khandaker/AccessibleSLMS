// Import Express Router
const express = require('express');
const router = express.Router();

// Import controller
const authController = require('../controllers/authController');

// Define routes

// POST /api/login (for all users)
router.post('/login', authController.login);

// Export router
module.exports = router;