const db = require('../utils/db');
const jwtdecode = require('jwt-decode');

const calculateResult = (req, res) => {
    const token = req.body.token;
    const decoded = jwtdecode(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const quiz_id = req.body.quiz_id;

    let no_of_correct = 0;
    let no_of_incorrect = 0;
    let no_of_unanswered = 0;

    let query = `SELECT COUNT(*) AS correctCount, (SELECT COUNT(*) FROM candidate_answers, questions WHERE questions.ques_id = candidate_answers.ques_id AND questions.correct_opt != candidate_answers.opted_option) AS incorrectCount FROM candidate_answers, questions WHERE questions.ques_id = candidate_answers.ques_id AND questions.correct_opt = candidate_answers.opted_option`;
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            // res.send(result);
            no_of_correct = result[0].correctCount;
            no_of_incorrect = result[0].incorrectCount;
            no_of_unanswered = 10 - (no_of_correct + no_of_incorrect);


            query = `INSERT INTO results(student_id, quiz_id, no_of_correct, no_of_incorrect, no_of_unanswered, score) VALUES ('${rollno}','${quiz_id}','${no_of_correct}','${no_of_incorrect}','${no_of_unanswered}','${no_of_correct}')`;
            db.query(query, (error, response) => {
                if(error){
                    console.log(error);
                    res.send(error);
                } else {
                    res.send('success');
                }
            })
        }
    })
}

module.exports = calculateResult;