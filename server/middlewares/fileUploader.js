const multer = require('multer');
const decoder = require('jwt-decode');
const db = require('../utils/db');

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads/');
    },
    filename: (req, file, callback) => {
        const token = req.body.token;
        const rollno = req.body.rollno;
        const assignmentid = req.body.assignmentid;
        const ext = file.mimetype.split('/')[1];
        callback(null, `${assignmentid} - ${rollno}.pdf`);
    },
})

const isFile = (req, file, callback) => {
    if (file.mimetype.startsWith('application')) {
        callback(null, true);
    } else {
        callback(new Error('Only Files are allowed'));
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter: isFile
});


exports.uploadFile = upload.single('file')


exports.upload = (req, res) => {
    const token = req.body.token;
    const rollno = req.body.rollno;
    const userType = req.body.userType;
    const assignmentid = req.body.assignmentid;
    const FILE = req.file;
    const courseID = assignmentid.split('_')[0];

    let query = `INSERT into assignment_files (assignment_id, course_id, student_id, student_file) VALUES ('${assignmentid}', '${courseID}','${rollno}','${FILE.filename}')`;

    db.query(query, (err, response) => {
        if (err) {
            // console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.send('duplicate');
            } else {
                res.send('error')
            }
        } else {
            res.send('success')
        }
    });
};
