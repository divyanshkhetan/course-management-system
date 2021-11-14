import axios from "axios";
import { useState, useEffect } from "react";
import QuizViewCardStudent from "./QuizViewCardStudent";

const QuizResultStudent = ({ quiz_id, correct, incorrect, unanswered, score }) => {

    const [attemptData, setAttemptData] = useState('');

    const apiCall = () => {
        const data = {
            token: localStorage.getItem('token'),
            quiz_id: quiz_id
        };

        axios.post('http://localhost:3001/api/details/attempt', data)
        .then(response => {
            setAttemptData(response.data);
            console.log(response);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        apiCall();
    }, []);

    return (
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
            
            <div>
                <div>
                    <strong>Correct Answers: </strong>
                    {correct}
                </div>

                <div>
                    <strong>Incorrect Answers:</strong>
                    {incorrect}
                </div>

                <div>
                    <strong>Unanswered: </strong>
                    {unanswered}
                </div>

                <div>
                    <strong>Score: </strong>
                    {score}
                </div>

            </div>

            <div>
                {attemptData.length > 0 && attemptData.map(q => {
                    return(<QuizViewCardStudent  key={q.ques_id} ques_id={q.ques_id} question={q.question} opt1={q.opt1} opt2={q.opt2} opt3={q.opt3} opt4={q.opt4} correctOpt={q.correct_opt} opted={q.opted_option} />)
                })}
            </div>
        </div>
    )
}

export default QuizResultStudent
