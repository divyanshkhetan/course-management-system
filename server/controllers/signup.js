const db = require('../utils/db');
const bcrypt = require('bcrypt');


const signup = async (req, res, next) => {                // Tested - Working
    let roll_number = req.body.rollno;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;

    // hashing password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;


    let query = `INSERT INTO students(roll_number, first_name, last_name, email, password) VALUES ('${roll_number}','${fname}','${lname}','${email}','${password}');`

    db.query(query, (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY'){
                console.log("Duplicate Entry!");
                res.send("duplicate");
            }
        } else {
            console.log("Success!");
            res.send("success");
        }
    });
}

module.exports = signup;