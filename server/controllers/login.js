const db = require('../utils/db');
const bcrypt = require('bcrypt');

const login = async(req, res, next) => {            // Tested - Working
    const rollno = req.body.rollno;
    const password = req.body.password;
    const userType = req.body.userType;
    let tableName = 'students';

    if(userType === 'student'){
        tableName = 'students';
    } else if(userType === 'faculty'){
        tableName = 'instructors';
    } else {
        res.send('error');
    }

    const query = `SELECT roll_number, password FROM ${tableName} WHERE roll_number = '${rollno}'`;

    db.query(query, (err, result) => {
        if(err){
            res.send('error');
        } else {
            if(result.length > 0){
                const profile = result[0];
                bcrypt.compare(password, profile.password, (err, response) => {
                    if(err){
                        res.send('error');              // unexpected error occured
                    } else {
                        if(response){
                            res.send('success');        // found and matched
                        } else {
                            res.send('failed');         // password incorrect
                        }
                    }
                })
            } else {
                res.send('invalid');                    // user not found
            }
        }
    })
};

module.exports = login;