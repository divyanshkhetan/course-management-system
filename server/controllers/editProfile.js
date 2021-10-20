const db = require('../utils/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const editProfile = async(req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const rollno = req.body.rollno;
    const userType = req.body.userType;
    let password = req.body.password;
    let tableName = 'students';
    if (userType === 'student') {
        tableName = 'students';
    } else if (userType === 'faculty') {
        tableName = 'instructors';
    } else {
        res.send('error');
    }

    let query = `UPDATE ${tableName} SET first_name='${fname}', last_name='${lname}', email='${email}'  WHERE roll_number='${rollno}'`;
    
    if (password !== '') {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
        query = `UPDATE ${tableName} SET first_name='${fname}', last_name='${lname}', email='${email}', password='${hashedPassword}' WHERE roll_number='${rollno}' `;
    }

    db.query(query, (err, result) => {
        if(err) {
            res.send('ERROR');
        } else {
            res.send("success");                // account successfully created
        }
    });
}

module.exports = editProfile;