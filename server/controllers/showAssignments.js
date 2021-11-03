const db = require('../utils/db');
const dotenv = require('dotenv');
dotenv.config();
const decoder = require('jwt-decode');

const showAssignments = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const assignmentid = req.body.assignmentid;

    let tableName = 'student';
    if (userType === 'student') {
        tableName = 'students';
    } else if (userType === 'faculty') {
        tableName = 'instructors';
    } else {
        res.send('error');
    }

    let query = '';

    if(userType === 'student'){
        if(assignmentid === 'null'){
            query = `SELECT * from assignments WHERE course_id IN (SELECT course_id FROM course_students WHERE student_id='${rollno}')`;     
        } else {
            query = `SELECT * from assignments WHERE assignment_id=${assignmentid} AND course_id IN (SELECT course_id FROM course_students WHERE student_id='${rollno}')`;     
        }
        

        
    } else {
        query = `SELECT * from assignments WHERE course_id IN (SELECT course_id FROM courses WHERE instructor_id='${rollno}')`;
    }

    db.query(query, (err, result) => {
        if(err) {
            res.send('ERROR');
        } else {
            res.send(result);        // all the courses associated with that student
        }
    });

}   

module.exports = showAssignments;