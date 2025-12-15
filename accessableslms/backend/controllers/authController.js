// Get database connection
const db = require('../config/db');

// Login Function (for all users)
const login = (req, res) => {
    console.log("🔐 Login request");
    
    // Get data from request body
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password required"
        });
    }
    
    // SQL query to find user
    const sql = 'SELECT * FROM user_account WHERE email = ?';
    
    // Run the query
    db.query(sql, [email], (error, results) => {
        if (error) {
            console.log("❌ Database error:", error.message);
            return res.json({
                success: false,
                message: "Database error"
            });
        }
        
        // Check if user exists
        if (results.length === 0) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        
        const user = results[0];
        
        // SIMPLE password check (plain text - for learning only!)
        if (user.password === password) {
            // Login successful
            console.log("✅ Login successful for:", email);
            res.json({
                success: true,
                message: "Login successful!",
                user: {
                    id: user.id,
                    name: user.full_name,
                    email: user.email,
                    role: user.role,
                    student_id: user.student_id,
                    employee_id: user.employee_id
                }
            });
        } else {
            // Wrong password
            console.log("❌ Wrong password for:", email);
            res.json({
                success: false,
                message: "Wrong password"
            });
        }
    });
};

// Export the function
module.exports = {
    login
};