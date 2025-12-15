// db.js - Simple database connection
const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',      // Default XAMPP MySQL host
  user: 'root',           // Default XAMPP MySQL username
  password: '',           // Default XAMPP MySQL password (empty)
  database: 'SLMS'  // Your database name
});

// Connect to MySQL
connection.connect((error) => {
  if (error) {
    console.error('❌ MySQL Connection Error:', error.message);
  } else {
    console.log('✅ Connected to MySQL Database!');
    console.log('📊 Database: express_test_db');
  }
});

// Export the connection
module.exports = connection;