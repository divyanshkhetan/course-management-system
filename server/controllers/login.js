const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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

    const query = `SELECT first_name, roll_number, password FROM ${tableName} WHERE roll_number = '${rollno}'`;

    db.query(query, (err, result) => {
        if(err){
            res.send('error');
        } else {
            if(result.length > 0){
                const profile = result[0];
                const fname = profile.first_name;
                bcrypt.compare(password, profile.password, (err, response) => {
                    console.log(response);
                    if(err){
                        res.send('error');              // unexpected error occured
                    } else {
                        if(response){
                            // generating a JWT token
                            jwt.sign({rollno, userType, fname}, process.env.TOKEN_SECRET, {expiresIn: '18000s'}, (err, token) => {
                                console.log(token);            // TO BE REMOVED
                                res.json({token});            // found and matched so JWT token
                            })
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