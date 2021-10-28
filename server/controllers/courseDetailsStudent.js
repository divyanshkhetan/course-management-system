const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const courseDetailsStudent = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const courseID = req.body.courseID;

    
}

module.exports = courseDetailsStudent;