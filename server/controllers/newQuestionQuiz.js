const db = require('../utils/db');
const decoder = require('jwt-decode');

const newQuestionQuiz = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const questionid = req.body.questionid;
    const question = req.body.question;
    const optionA = req.body.optionA;
    const optionB = req.body.optionB;
    const optionC = req.body.optionC;
    const optionD = req.body.optionD;
    const correctOption = req.body.correctOption;
    const userType = decoded.userType;
    const rollno = decoded.rollno;
    const quiz_id = req.body.quiz_id;

    if (userType !== 'faculty') {
        res.send('Unauthorized Access');
    }
    // TODO: change this query
    let query = `INSERT INTO questions(ques_id, quiz_id, question, opt1, opt2, opt3, opt4, correct_opt) VALUES ('${questionid}', '${quiz_id}', '${question}', '${optionA}', '${optionB}', '${optionC}', '${optionD}', '${correctOption}')`;

    db.query(query, (error, response) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.send('Question Already Exists');          // question already exists
            } else {
                res.send('error');
            }
        } else {
            res.send('success');
        }
    })

}

module.exports = newQuestionQuiz;