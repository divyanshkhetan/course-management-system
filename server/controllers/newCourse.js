const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const newCourse = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const courseID = req.body.courseID;
    const courseName = req.body.courseName;
    const userType = decoded.userType;

    if(userType !== 'faculty'){
        res.send('Access Denied');
    }

    let query = `INSERT INTO courses(course_id, course_name, instructor_id) VALUES ('${courseID}','${courseName}','${rollno}');`

    db.query(query, (err, response) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                res.send("duplicate");          // course ID already exists
            } else {
                res.send('error');
            }
        } else {
            res.send('success');
        }
    })
}

module.exports = newCourse;