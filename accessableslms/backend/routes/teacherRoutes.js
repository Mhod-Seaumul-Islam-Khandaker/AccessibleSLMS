// Import Express Router
const express = require('express');
const router = express.Router();

// Import controller
const teacherController = require('../controllers/teacherController');

// Define routes

// POST /api/teacher/signup
router.post('/signup', teacherController.teacherSignup);

// You can add more teacher routes later:
// router.get('/profile', teacherController.getProfile);

// Export router
module.exports = router;