// Get database connection
const db = require('../config/db');

// Student Signup Function
const studentSignup = (req, res) => {
    console.log("📝 Student signup request");
    
    // Get data from request body
    const { full_name, email, password, student_id } = req.body;
    
    // Simple validation
    if (!full_name || !email || !password || !student_id) {
        return res.json({
            success: false,
            message: "All fields required: name, email, password, student_id"
        });
    }
    
    // SQL query to insert student
    const sql = `
        INSERT INTO user_account 
        (full_name, email, password, role, student_id) 
        VALUES (?, ?, ?, 'student', ?)
    `;
    
    // Run the query
    db.query(sql, [full_name, email, password, student_id], (error, results) => {
        if (error) {
            console.log("❌ Database error:", error.message);
            return res.json({
                success: false,
                message: "Database error: " + error.message
            });
        }
        
        // Success response
        console.log("✅ Student created with ID:", results.insertId);
        res.json({
            success: true,
            message: "Student account created!",
            studentId: results.insertId,
            student_id: student_id
        });
    });
};

// Export the function
module.exports = {
    studentSignup
};