const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const showNewCourses = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;

    if(userType !== 'student'){
        res.send('Access Denied');
    }

    let query = `SELECT * from courses WHERE course_id NOT IN (Select course_id FROM course_students WHERE student_id='${rollno}')`; 
    
    db.query(query, (err, result) => {
        if(err){
            res.send('error');
        } else {
            res.send(result);
        }
    })
}

module.exports = showNewCourses;