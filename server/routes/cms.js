const express = require('express');

const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
const {upload, uploadFile} = require('../middlewares/fileUploader');

// Controllers
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const welcome = require('../controllers/welcome');
const profileInfo = require('../controllers/profileInfo');
const editProfile = require('../controllers/editProfile');
const courses = require('../controllers/courses');
const newCourse = require('../controllers/newCourse');
const showNewCourses = require('../controllers/showNewCourses');
const addNewCourseStudent = require('../controllers/addNewCourseStudent');
const courseDetailsStudent = require('../controllers/courseDetailsStudent');
const newAssignment = require('../controllers/newAssignment');
const showAssignments = require('../controllers/showAssignments');
const assignmentFileDownloader = require('../controllers/assignmentFileDownloader');
const deleteCourse = require('../controllers/deleteCourse');
const newQuizCreator = require('../controllers/newQuizCreator');
const newQuestionQuiz = require('../controllers/newQuestionQuiz');
const existingQuizes = require('../controllers/existingQuizes');
const viewQuiz = require('../controllers/viewQuiz');
const saveCandidateAnswers = require('../controllers/saveCandidateAnswers');
const calculateResult = require('../controllers/calculateResult');
const attemptDetails = require('../controllers/attemptDetails');

// Routes
router.post('/api/signup', signup);
router.post('/api/login', login);
router.post('/welcome', auth, welcome);
router.post('/tokenCheck', auth, (req, res) => {
    res.send('valid');
});
router.post('/api/profileInfo', auth, profileInfo);
router.post('/api/editProfile', auth, editProfile);
router.post('/api/courses', auth, courses);
router.post('/api/newCourse', auth, newCourse);
router.post('/api/showNewCourses', auth, showNewCourses);
router.post('/api/addNewCourseStudent', auth, addNewCourseStudent);
router.post('/api/courseDetailsStudent', auth, courseDetailsStudent);
router.post('/api/newAssignmentFaculty', auth, newAssignment);
router.post('/api/assignments', auth, showAssignments);
router.post('/api/studentAssignmentSubmit',uploadFile, upload);
router.post('/api/assignmentFileDownloader', auth, assignmentFileDownloader);
router.post('/api/deleteCourse', auth, deleteCourse);
router.post('/api/newQuiz', auth, newQuizCreator);
router.post('/api/newQuestionQuiz', auth, newQuestionQuiz);
router.post('/api/existingquizes', auth, existingQuizes);
router.post('/api/viewQuiz', auth, viewQuiz);
router.post('/api/save/quiz/candidateAnswer', auth, saveCandidateAnswers);
router.post('/api/calculateResult', auth, calculateResult);
router.post('/api/details/attempt', auth, attemptDetails);

module.exports = router;