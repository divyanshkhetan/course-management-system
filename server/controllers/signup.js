const db = require('../utils/db');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {                // Tested - Working
    let roll_number = req.body.rollno;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    let userType = req.body.userType;
    let tableName = 'students';
    
    if(userType === 'student'){
        tableName = 'students';
    } else if(userType === 'faculty'){
        tableName = 'instructors';
    } else {
        res.send('error');
    }

    // hashing password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;


    let query = `INSERT INTO ${tableName}(roll_number, first_name, last_name, email, password) VALUES ('${roll_number}','${fname}','${lname}','${email}','${password}');`

    db.query(query, (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY'){
                res.send("duplicate");          // account already exists
            }
        } else {
            res.send("success");                // account successfully created
        }
    });
}

module.exports = signup;