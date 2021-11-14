const db = require('../utils/db');
const decoder = require('jwt-decode');

const saveCandidateAnswers = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const userType = decoded.userType;
    const rollno = decoded.rollno;
    const ques_id = req.body.ques_id;
    const quiz_id = req.body.quiz_id;
    const opted_option = req.body.opted_option;

    let query = `INSERT INTO candidate_answers(student_id, quiz_id, ques_id, opted_option) VALUES ('${rollno}','${quiz_id}','${ques_id}','${opted_option}')`;

    db.query(query, (err, result) => {
        if(err){
            if (err.code === 'ER_DUP_ENTRY') {
                res.send('You have already answered this question');          // question already exists
            } else {
                res.send('error');
            }
        } else {
            res.send('Success');
        }
    })
}

module.exports = saveCandidateAnswers