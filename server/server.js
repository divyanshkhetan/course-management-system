const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions)) 
app.use(express.json());

// Setting up router
const routes = require('./routes/cms.js');
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
