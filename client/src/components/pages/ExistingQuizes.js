import axios from "axios";
import { useState, useEffect } from "react";
import QuizCard from "../QuizCard";
import jwt_decode from "jwt-decode";

const ExistingQuizes = () => {

    const localToken = localStorage.getItem('token');
    const userType = jwt_decode(localToken).userType;
    const rollno = jwt_decode(localToken).rollno;
    const [quizes, setQuizes] = useState('');

    const apiCall = async() => {
        const data = {
            token: localStorage.getItem('token')
        }

        axios.post('http://localhost:3001/api/existingquizes', data)
            .then(response => {
                setQuizes(response.data);
            })
            .catch(err => console.log('error'))
    }

    useEffect(() => {
        apiCall();
    }, [])


    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {quizes.length > 0 && quizes.map(quiz => {
                    return (<QuizCard key={quiz.quiz_id} quizid={quiz.quiz_id} quizname={quiz.quiz_name} />)
                })}
            </div>
        </>
    )
}

export default ExistingQuizes
