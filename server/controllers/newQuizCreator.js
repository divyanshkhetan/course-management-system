const db = require('../utils/db');
const decoder = require('jwt-decode');

const newQuizCreator = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const courseid = req.body.courseid;
    const quizid = req.body.quizid;
    const userType = decoded.userType;
    const rollno = decoded.rollno;
    const quizName = req.body.quizName;

    if(userType !== 'faculty'){
        res.send('Unauthorized');
    }

    let query = `SELECT * FROM courses WHERE course_id='${courseid}' AND instructor_id='${rollno}'`;

    db.query(query, (err, response) => {
        if (err) {
            res.send('error');
            console.log(err.code);
        }
        if (response.length > 0) {    //working
            query = `INSERT INTO quizes(quiz_id, quiz_name, course_id) VALUES ('${quizid}', '${quizName}', '${courseid}')`;
            db.query(query, (error, result) => {
                if (error) {
                    // console.log(error.code);
                    // throw error;
                    if (error.code === 'ER_DUP_ENTRY') {
                        res.send('Quiz Already Exists');          // quiz already exists
                    } else {
                        res.send('error');
                    }
                } else {    //working
                    res.send('success');
                }
            })
        } else {
            res.send('Unauthorized Access');
        }
    });
}

module.exports = newQuizCreator;