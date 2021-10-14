const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 3001;

// Creating connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cms'
});

db.connect( err => {
    if(err) {
        throw err;
    } 
    console.log("MySql Connected as id: " + db.threadId);
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});