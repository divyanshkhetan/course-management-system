const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const setAssignmentMarks = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const assignmentid = req.body.assignmentid;
    const studentid = req.body.studentid;
    const marks = req.body.marks;

    let query = `UPDATE assignment_files SET marks_obtained='${marks}' WHERE assignment_id='${assignmentid}' AND student_id='${studentid}'`;

    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.send('error');
        } else {
            res.send('success');
        }
    })
}

module.exports = setAssignmentMarks;