const db = require('../utils/db');
const dotenv = require('dotenv');
dotenv.config();
const decoder = require('jwt-decode');
const multer = require('multer');

const studentAssignmentSubmit = (req, res) => {
    const token = req.body.token;
    const decoded = decoder(token);
    const rollno = decoded.rollno;
    const userType = decoded.userType;
    const assignmentid = req.body.assignmentid;
    console.log(token);
    console.log(rollno);
    console.log(userType);
    console.log(assignmentid);
    
    let tableName = 'student';
    if (userType === 'student') {
        tableName = 'students';
    } else if (userType === 'faculty') {
        tableName = 'instructors';
    } else {
        res.send('error');
    }



    // const storage = multer.diskStorage({
    //     destination: function(req, file, cb) {
    //         cb(null, 'uploads/');
    //     },
    
    //     // By default, multer removes file extensions so let's add them back
    //     filename: function(req, file, cb) {
    //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    //     }
    // });
    // // const upload = multer().single(`${assignmentid}_${rollno}`);
    // let upload = multer({ storage: storage }).single('file');

    // upload(req, res, function(err) {
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any

    //     if (req.fileValidationError) {
    //         console.log('A')
    //         return res.send(req.fileValidationError);
    //     }
    //     else if (!req.file) {
    //         console.log('b')
    //         return res.send('Please select an image to upload');
    //     }
    //     else if (err instanceof multer.MulterError) {
    //         console.log('c')
    //         return res.send(err);
    //     }
    //     else if (err) {
    //         console.log('d')
    //         return res.send(err);
    //     }
        
    //     console.log('e')
    //     // Display uploaded image for user validation
    //     res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    // });
    
    let query = `INSERT into assignment_files (assignment_id, student_id, student_file) VALUES ('${assignmentid}','${rollno}','${FILE}')`;

    db.query(query, (err, response) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                res.send("duplicate");
            } else {
                res.send('error');
            }
        } else {
            res.send('success');
        }
    })
}

module.exports = studentAssignmentSubmit;