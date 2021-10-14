const mysql = require('mysql');

// Creating database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cms'
});

db.connect( err => {
    if(err) {
        console.log("Connection Failed!");
        throw err;
    } else {
        console.log("MySql Connected as id: " + db.threadId);
    }
});

module.exports = db;
