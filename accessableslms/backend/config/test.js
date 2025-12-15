const db = require('./db');

// Test query
db.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) {
    console.error('❌ Query Error:', error.message);
  } else {
    console.log('✅ Database test successful!');
    console.log('Result:', results[0].solution); // Should show 2
  }
  
  // Close connection after test
  db.end();
});