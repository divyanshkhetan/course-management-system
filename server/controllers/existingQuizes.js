const db = require('../utils/db');
const decoder = require('jwt-decode');

const existingQuizes = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const userType = decoded.userType;
    const rollno = decoded.rollno;
    
    let query = ``;

    if(userType === 'faculty'){
        query = `SELECT * from quizes WHERE course_id IN (SELECT course_id FROM courses WHERE instructor_id='${rollno}')`;
    } else if(userType === 'student'){  
        query = `SELECT * FROM quizes WHERE course_id IN (SELECT course_id FROM course_students WHERE student_id='${rollno}')`;
    } else {
        res.send('Unauthorized')
    }

    db.query(query, (err, response) => {
        if(err) {
            res.send('error');
            console.log(err);
        } else {
            res.send(response);
        }
    })
}

module.exports = existingQuizes;