const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(express.json());

// Setting up router
const routes = require('./routes/cms.js');
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
