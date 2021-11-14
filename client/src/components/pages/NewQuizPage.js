import axios from "axios";
import NavBar from "../NavBar";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QuizQuestionCard from "../QuizQuestionCard";
import './NewQuizPage.css';
import { useHistory } from 'react-router';


const NewQuizPage = () => {

    const history = useHistory();

    const [courseID, setCourseID] = useState('');
    const [quizNumber, setQuizNumber] = useState('');
    const [quizName, setQuizName] = useState('');
    const [questionState, setQuestionState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const courseIDHandler = (e) => {
        setCourseID(e.target.value);
    }

    const quizNumberHandler = (e) => {
        setQuizNumber(e.target.value);
    }

    const quizNameHandler = (e) => {
        setQuizName(e.target.value);
    }
    
    const quizDoneHandler = (e) => {
        history.push('/dashboard');
    }

    const quizSaveHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            quizid: `${courseID}_${quizNumber}`,
            courseid: courseID,
            quizName: quizName
        };
        axios.post('http://localhost:3001/api/newQuiz', data)
        .then(response => {
            if(response.data === 'success'){
                setQuestionState(true);
                setErrorMessage('Success');
            } else {
                setErrorMessage(response.data);
            }
        })
        .catch(err => console.log("ERROR"));
    }

    const quiz_id=`${courseID}_${quizNumber}`;
    return (
        <div style={{overflow:'visible'}}>
            <NavBar />
            <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <div style={{margin: '1rem'}}>
                    <span style={{ fontSize: '1.8rem' }} > Quiz ID: </span>

                    <TextField onChange={courseIDHandler} value={courseID} label="Course ID" variant="outlined" required />
                    <span style={{ fontSize: '2rem' }} > - </span>
                    <TextField onChange={quizNumberHandler} value={quizNumber} label="Quiz Number" variant="outlined" required />
                </div>
                <div style={{margin: '1rem'}}>
                    <span style={{ fontSize: '1.8rem' }} > Quiz Name: </span>
                    <TextField value={quizName} onChange={quizNameHandler} label="Quiz Name" variant="outlined" required />
                </div>
                <div style={{marginTop: '0.5rem'}}>
                    <Button onClick={quizSaveHandler} variant="contained">Save</Button>
                </div>
                <span style={{ fontSize: '1.5rem', margin: '1rem' }} > {errorMessage} </span>
                {questionState && 
                    <div style={{border: '1px solid #333', borderRadius: '10px'}}>
                        <QuizQuestionCard questionCount="1" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="2" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="3" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="4" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="5" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="6" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="7" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="8" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="9" quiz_id={quiz_id} />
                        <QuizQuestionCard questionCount="10" quiz_id={quiz_id} />
                    </div> }
                    {questionState && <Button onClick={quizDoneHandler} variant="contained">Done</Button>
                }
            </div>
        </div>
    )
}

export default NewQuizPage
