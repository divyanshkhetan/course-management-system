import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import NavBar from "../NavBar";
import QuestionViewCardFaculty from '../QuizViewCardFaculty';
import jwt_decode from "jwt-decode";
import QuizQACardStudent from "./QuizQACardStudent";
import Button from '@mui/material/Button';
import QuizResultStudent from "../QuizResultStudent";

const ViewQuizPage = () => {
    const {quizid} = useParams();
    const [quizData, setQuizData] = useState('');
    const localToken = localStorage.getItem('token');
    const userType = jwt_decode(localToken).userType;
    const rollno = jwt_decode(localToken).rollno;
    const history = useHistory();

    const apiCall = () => {
        const data = {
            token: localStorage.getItem('token'),
            quizid: quizid
        }

        axios.post('http://localhost:3001/api/viewQuiz', data)
        .then(response => {
            console.log(response);
            setQuizData(response.data);
        })
        .catch(err => console.log('Error'));
    }

    const quizSubmitHandler = () => {
        const data = {
            token: localStorage.getItem('token'),
            quiz_id: quizid
        }

        axios.post('http://localhost:3001/api/calculateResult', data)
        .then(response => {
            if(response.data === 'success'){
                history.push('/dashboard');
            }
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        apiCall();
    }, []);

    return(
        <>
            < NavBar />
            {userType === 'faculty' && < div>
                <h2 style={{width: '100%', textAlign: 'center'}}>Quiz ID: {quizid}</h2>
                {quizData.length > 0 && quizData.map(q => {
                    return (<QuestionViewCardFaculty key={q.ques_id} ques_id={q.ques_id} question={q.question} opt1={q.opt1} opt2={q.opt2} opt3={q.opt3} opt4={q.opt4} correctOpt={q.correct_opt} />)
                })}
            </div>}
            {
                userType === 'student' && 
                <div style={{textAlign: 'center'}}>
                    <h2 style={{width: '100%', textAlign: 'center'}}>Quiz ID: {quizid}</h2>
                    {quizData.length === 1 && 
                        < QuizResultStudent quiz_id={quizid} correct={quizData[0].no_of_correct} unanswered={quizData[0].no_of_unanswered} incorrect={quizData[0].no_of_incorrect} score={quizData[0].score} />
                    }
                    {
                        quizData.length > 1 && quizData.map(q => {
                            return(<QuizQACardStudent key={q.ques_id} quiz_id={quizid} ques_id={q.ques_id} question={q.question} opt1={q.opt1} opt2={q.opt2} opt3={q.opt3} opt4={q.opt4} />)
                        })
                    }
                    {
                        quizData.length > 1 && 
                        <Button style={{marginBottom: "1rem", width: '7rem'}} onClick={quizSubmitHandler} variant="contained">Done</Button>
                    }
                </div>
            }
        </>
    )
}

export default ViewQuizPage;