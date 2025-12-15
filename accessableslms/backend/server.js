const express = require('express');
const db = require('./config/db')
// Import route files
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware to read JSON requests
app.use(express.json());
// Student routes: /api/student/*
app.use('/api/student', studentRoutes);

// Teacher routes: /api/teacher/*
app.use('/api/teacher', teacherRoutes);

// Auth routes: /api/*
app.use('/api', authRoutes);

// ========== HOME PAGE ==========
app.get('/', (req, res) => {
    res.send(`
        <h1>🎓 Accessable LMS Backend</h1>
        <h2>API Endpoints:</h2>
        
        <h3>📚 Student Routes:</h3>
        <ul>
            <li><strong>POST /api/student/signup</strong> - Create student account</li>
            <li>Body: {full_name, email, password, student_id}</li>
        </ul>
        
        <h3>👨‍🏫 Teacher Routes:</h3>
        <ul>
            <li><strong>POST /api/teacher/signup</strong> - Create teacher account</li>
            <li>Body: {full_name, email, password, employee_id}</li>
        </ul>
        
        <h3>🔐 Auth Routes:</h3>
        <ul>
            <li><strong>POST /api/login</strong> - Login for all users</li>
            <li>Body: {email, password}</li>
        </ul>
        
        <p><strong>⚠️ Note:</strong> Passwords stored in plain text (for learning only!)</p>
    `);
});

// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`📚 Student signup: POST http://localhost:${PORT}/api/student/signup`);
    console.log(`👨‍🏫 Teacher signup: POST http://localhost:${PORT}/api/teacher/signup`);
    console.log(`🔐 Login: POST http://localhost:${PORT}/api/login`);
    
    // Test database connection
    db.query('SELECT 1', (error) => {
        if (error) {
            console.log('❌ Database connection failed');
        } else {
            console.log('✅ Database connected');
        }
    });
});