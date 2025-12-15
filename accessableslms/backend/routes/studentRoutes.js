// Import Express Router
const express = require('express');
const router = express.Router();

// Import controller
const studentController = require('../controllers/studentController');

// Define routes

// POST /api/student/signup
router.post('/signup', studentController.studentSignup);

// You can add more student routes later:
// router.get('/profile', studentController.getProfile);
// router.put('/update', studentController.updateProfile);

// Export router
module.exports = router;