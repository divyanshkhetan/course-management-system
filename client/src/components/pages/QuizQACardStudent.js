import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const QuizQACardStudent = ({ ques_id, quiz_id, question, opt1, opt2, opt3, opt4 }) => {

    const questionCount = ques_id.split('_');
    const token = localStorage.getItem('token');
    const userType = jwt_decode(token).userType;
    const rollno = jwt_decode(token).rollno;

    const [candidateChoice, setCandidateChoice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const candidateChoiceHandler = (e) => {
        setCandidateChoice(e.target.value);
    }

    const saveHandler = (e) => {
        const data = {
            token: token,
            quiz_id: quiz_id,
            ques_id: ques_id,
            opted_option: candidateChoice
        }

        axios.post('http://localhost:3001/api/save/quiz/candidateAnswer', data)
            .then(response => setErrorMessage(response.data))
            .catch(err => console.log(err));
    }

    return (
        <div >
            <div style={{ padding: '0px 2rem 2rem 2rem', margin: '1rem', border: '2px solid #333', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ margin: '1rem', fontSize: '1.5rem', textAlign:'center' }}>
                    <strong> Question  {questionCount[2]}: </strong>
                </div>
                <div style={{textAlign: 'center'}}>
                    <strong> Question: </strong>{question}
                </div>
                <div style={{textAlign: 'center'}}>
                    <FormControl component="fieldset" style={{ border: '1px solid #ccc', padding: '0.5rem 1rem', marginTop: '1rem' }}>
                        <FormLabel component="legend">Correct Option</FormLabel>
                        < RadioGroup row
                            aria-label="Candidate Choice"
                            name="row-radio-buttons-group"
                            value={candidateChoice}
                            onChange={candidateChoiceHandler} >
                            <FormControlLabel value="A" control={<Radio />} label={opt1} />
                            <FormControlLabel value="B" control={<Radio />} label={opt2} />
                            <FormControlLabel value="C" control={<Radio />} label={opt3} />
                            <FormControlLabel value="D" control={<Radio />} label={opt4} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div style={{ margin: '1rem', textAlign: 'center' }}>
                    <Button style={{ margin: '1rem' }} onClick={saveHandler} variant="contained">Save</Button>
                    {errorMessage}
                </div>
            </div>
        </div>
    )
}

export default QuizQACardStudent
