const db = require('../utils/db');

const profileInfo = (req, res) => {
    const rollno = req.body.rollno;
    const userType = req.body.userType;
    let fname = '';
    let lname = '';
    let email = '';
    let password = '';

    let tableName = 'students';

    if(userType === 'student'){
        tableName = 'students';
    } else if(userType === 'faculty'){
        tableName = 'instructors';
    } else {
        res.send('error');
    }

    let query = `SELECT * from ${tableName} WHERE roll_number='${rollno}'`;
    db.query(query, (err, result) => {
        if(err){
            res.send('error');
        }
        const profile = result[0];
        fname = profile.first_name;
        lname = profile.last_name;
        email = profile.email;
        password = profile.password;
        res.json({fname, lname, email, password, rollno, userType});
    })

}

module.exports = profileInfo;