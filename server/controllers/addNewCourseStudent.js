const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const addNewCourseStudent = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const courseID = req.body.courseID;

    if(userType !== 'student'){
        res.send('Access Denied');
    }

    let query = `INSERT INTO course_students(course_id, student_id) VALUES ('${courseID}','${rollno}')`;

    db.query(query, (err, response) => {
        if(err){
            res.send('error');
        } else {
            res.send('success');
        }
    })
}

module.exports = addNewCourseStudent;