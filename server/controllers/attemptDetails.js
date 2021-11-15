const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const attemptDetails = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const quiz_id = req.body.quiz_id;

    let query = `SELECT questions.*, opted_option FROM questions, candidate_answers WHERE questions.quiz_id = candidate_answers.quiz_id AND questions.ques_id = candidate_answers.ques_id AND student_id='${rollno}' AND questions.quiz_id='${quiz_id}'`;
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.send('error');
        } else {
            res.send(result);
        }
    })
}

module.exports = attemptDetails;