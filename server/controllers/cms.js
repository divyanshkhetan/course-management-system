const db = require('../utils/db');

const cmsHomePage = (req, res, next) => {           // tested - working
    res.json({message: "get homepage"});
};

const signup = (req, res, next) => {                // not working
    let roll_number = req.body.rollno;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;               // TODO: hash the password
    let query1 = `INSERT INTO students(roll_number, first_name, last_name, email, password) VALUES ('${roll_number}','${fname}','${lname}','${email}','${password}');`
    // let data = {
    //     roll_number: req.body.rollno,
    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     email: req.body.email,
    //     password: req.body.password
    // };

    db.query(query1, (err, res) => {
        if(err) {
            throw err;
        } else {
            console.log("Success!");
        }
    });
}

module.exports = {cmsHomePage, signup};