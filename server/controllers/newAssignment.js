const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const newAssignment = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const assignmentID = req.body.assignmentID;
    const assignmentQuestion = req.body.assignmentQuestion;
    const courseID = req.body.courseID;

    if (userType !== 'faculty') {
        res.send('Access Denied');
    }

    let query = `SELECT * FROM courses WHERE course_id='${courseID}' AND instructor_id='${rollno}'`;

    db.query(query, (err, response) => {
        if (err) {
            res.send('error');
            console.log(err.code);
        }
        if (response.length > 0) {    //working
            query = `INSERT INTO assignments (assignment_id, course_id, question) VALUES ('${assignmentID}','${courseID}','${assignmentQuestion}')`;

            db.query(query, (error, result) => {
                if (error) {
                    // console.log(error.code);
                    // throw error;
                    if (error.code === 'ER_DUP_ENTRY') {
                        res.send('duplicate');          // assignment already exists
                    } else {
                        res.send('error');
                    }
                } else {    //working
                    res.send('success');
                }
            })
        } else {
            res.send('Access Denied'); //working
        }
    })
}

module.exports = newAssignment;