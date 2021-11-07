const db = require('../utils/db');
const decoder = require('jwt-decode');
const e = require('express');

const deleteCourse = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const courseID = req.body.courseid;

    let query = ``;
    if(userType === 'student'){
        query = `DELETE from course_students WHERE course_id='${courseID}' AND student_id='${rollno}'`;
    }

    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.send('error');
        } else {
            query = `DELETE from assignment_files WHERE course_id='${courseID}' AND student_id='${rollno}'`;
            
            db.query(query, (err, result) => {
                if(err){
                    console.log(err);
                    res.send('error');
                } else {
                    query = `DELETE from quiz_marks WHERE course_id='${courseID}' AND student_id='${rollno}'`;
                    
                    db.query(query, (err, result) => {
                        if(err){
                            console.log(err);
                            res.send('error');
                        } else {
                            res.send('success');
                        }
                    })
                }
            })
        }
    })
}

module.exports = deleteCourse;