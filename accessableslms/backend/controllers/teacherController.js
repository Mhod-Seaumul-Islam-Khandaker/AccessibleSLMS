// Get database connection
const db = require('../config/db');

// Teacher Signup Function
const teacherSignup = (req, res) => {
    console.log("👨‍🏫 Teacher signup request");
    
    // Get data from request body
    const { full_name, email, password, employee_id } = req.body;
    
    // Simple validation
    if (!full_name || !email || !password || !employee_id) {
        return res.json({
            success: false,
            message: "All fields required: name, email, password, employee_id"
        });
    }
    
    // SQL query to insert teacher
    const sql = `
        INSERT INTO user_account 
        (full_name, email, password, role, employee_id) 
        VALUES (?, ?, ?, 'teacher', ?)
    `;
    
    // Run the query
    db.query(sql, [full_name, email, password, employee_id], (error, results) => {
        if (error) {
            console.log("❌ Database error:", error.message);
            return res.json({
                success: false,
                message: "Database error: " + error.message
            });
        }
        
        // Success response
        console.log("✅ Teacher created with ID:", results.insertId);
        res.json({
            success: true,
            message: "Teacher account created!",
            teacherId: results.insertId,
            employee_id: employee_id
        });
    });
};

// Export the function
module.exports = {
    teacherSignup
};
