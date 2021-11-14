const db = require('../utils/db');
const decoder = require('jwt-decode');

const viewQuiz = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const quizid = req.body.quizid;

    let query =``;

    if(userType === 'faculty'){
        query = `SELECT * FROM questions WHERE quiz_id = '${quizid}'`;
        db.query(query, (err, result) => {
            if(err){
                res.send("ERROR");
            } else {
                res.send(result);
            }
        }) 
    } else {
        query = `SELECT * FROM results WHERE quiz_id='${quizid}' AND student_id='${rollno}'`;

        db.query(query, (err, result) => {
            if(err) {
                res.send('Error');
                console.log(err);
            } else {
                if(result.length > 0){
                    res.send(result);
                } else {
                    query = `SELECT * FROM questions WHERE quiz_id = '${quizid}'`;
                    db.query(query, (error, response) => {
                        if(error){
                            res.send('Error');
                            console.log(error);
                        } else {
                            res.send(response);
                        }
                    })
                }
            }
        })
    }

}

module.exports = viewQuiz;