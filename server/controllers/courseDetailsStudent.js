const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const courseDetailsStudent = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const courseID = req.body.courseID;

    let query = `SELECT first_name, last_name, instructor_id, course_id, course_name from instructors, courses where instructors.roll_number = courses.instructor_id AND course_id='${courseID}'`;

    db.query(query, (err, result) => {
        if(err){
            console.log(err);
        } else {
            let response_data = result;
            // console.log(result);

            query = `SELECT COUNT(assignment_id) AS no_of_ass, SUM(max_marks) AS ass_marks_total,
            (SELECT SUM(marks_obtained) from assignment_files where course_id='${courseID}' AND student_id='${rollno}') AS ass_marks_obtnd from assignments where course_id='${courseID}'`;

            db.query(query, (err, result) => {
                if(err){
                    console.log(err);
                } else {
                    // console.log(result);
                    response_data = [...response_data, ...result];
                    // console.log(response_data);

                    query = `SELECT COUNT(quiz_id) AS no_of_quizes, SUM(maximum_marks) AS quiz_marks_total, (SELECT SUM(marks_obtained) FROM quiz_marks WHERE course_id='${courseID}' AND student_id='${rollno}') AS quiz_marks_obtnd from quizes where course_id='${courseID}'`;

                    db.query(query, (err, result) => {
                        if(err){
                            console.log(err);
                        } else {
                            response_data = [...response_data, ...result];
                            // console.log(response_data);
                            res.send(response_data);
                        }
                    })
                }
            })
        }
    })
}

module.exports = courseDetailsStudent;