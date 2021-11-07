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
            query = `SELECT assignments.*, (SELECT marks_obtained from assignment_files WHERE assignment_files.student_id='${rollno}' AND assignment_id='${assignmentid}') from assignments WHERE assignments.assignment_id='${assignmentid}';`;     
        }        
    } else {
        if(assignmentid === 'null'){
            query = `SELECT * from assignments WHERE course_id IN (SELECT course_id FROM courses WHERE instructor_id='${rollno}')`;
        } else {
            query = `SELECT assignments.*, (SELECT student_id from assignment_files WHERE assignment_files.assignment_id='${assignmentid}') AS 'student_id', (SELECT marks_obtained from assignment_files WHERE assignment_files.assignment_id='${assignmentid}') AS 'marks_obtained' from assignments WHERE assignments.assignment_id='${assignmentid}';`;
        }
    }

    db.query(query, (err, result) => {
        if(err) {
            // console.log(err);
            res.send('ERROR');
        } else {
            // console.log(result);
            res.send(result);        // all the courses associated with that student
        }
    });

}   

module.exports = showAssignments;