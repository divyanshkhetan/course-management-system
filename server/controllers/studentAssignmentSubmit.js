const db = require('../utils/db');
const dotenv = require('dotenv');
dotenv.config();
const decoder = require('jwt-decode');
const multer = require('multer');

const studentAssignmentSubmit = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const assignmentid = req.body.assignmentid;
    console.log(token);
    console.log(rollno);
    console.log(userType);
    console.log(assignmentid);
    
    let tableName = 'student';
    if (userType === 'student') {
        tableName = 'students';
    } else if (userType === 'faculty') {
        tableName = 'instructors';
    } else {
        res.send('error');
    }
    
    let query = `INSERT into assignment_files (assignment_id, student_id, student_file) VALUES ('${assignmentid}','${rollno}','${FILE}')`;

    db.query(query, (err, response) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                res.send("duplicate");
            } else {
                res.send('error');
            }
        } else {
            res.send('success');
        }
    })
}

module.exports = studentAssignmentSubmit;