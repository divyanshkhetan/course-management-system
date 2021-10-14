const express = require('express');
const app = express();
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

app.use(express.json());

// Creating database connection
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

// Setting up router
const routes = require('./routes/cms.js');
app.use('/', routes);


app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});