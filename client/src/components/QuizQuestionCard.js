import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const QuizQuestionCard = ({ questionCount, quiz_id }) => {

    const [question, setQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [correctOption, setCorrectOption] = useState('A');
    const [errorMessage, setErrorMessage] = useState('');

    const questionChangeHandler = (e) => {
        setQuestion(e.target.value);
    }
    const optionAChangeHandler = (e) => {
        setOptionA(e.target.value);
    }
    const optionBChangeHandler = (e) => {
        setOptionB(e.target.value);
    }
    const optionCChangeHandler = (e) => {
        setOptionC(e.target.value);
    }
    const optionDChangeHandler = (e) => {
        setOptionD(e.target.value);
    }
    const correctOptionHandler = (e) => {
        setCorrectOption(e.target.value);
    }

    const saveButtonHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            questionid: `${quiz_id}_${questionCount}`,
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctOption: correctOption,
            quiz_id: `${quiz_id}`
        }

        axios.post('http://localhost:3001/api/newQuestionQuiz', data)
        .then(response => {
            setErrorMessage(response.data);
        })
        .catch(err => console.log('ERROR'))
    }

    return (
        <div style={{ }}>
            <div style={{ padding: '0px 2rem 2rem 2rem', margin: '1rem', border: '2px solid #333', borderRadius: '10px' }}>
                <div style={{ margin: '1rem', fontSize: '1.5rem' }}>
                    Question {questionCount}:
                </div>
                {/* <span>Question: </span> */}
                <TextField
                    style={{ backgroundColor: '#eee', width: '100%' }}
                    label="Question"
                    multiline
                    minRows={4}
                    variant="outlined"
                    value={question}
                    onChange={questionChangeHandler}
                />
                <div style={{ margin: '2rem' }}>

                    <table style={{ margin: 'auto' }}>
                        <tbody>
                        <tr>
                            <td>
                                <TextField value={optionA} onChange={optionAChangeHandler} style={{ minWidth: '25rem' }}  style={{margin:'1rem'}} label="option A" variant="outlined" />
                            </td>
                            <td>
                                <TextField value={optionB} onChange={optionBChangeHandler} style={{ minWidth: '25rem' }}  style={{margin:'1rem'}} label="option B" variant="outlined" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField value={optionC} onChange={optionCChangeHandler} style={{ minWidth: '25rem' }}  style={{margin:'1rem'}} label="option C" variant="outlined" />
                            </td>
                            <td>
                                <TextField value={optionD} onChange={optionDChangeHandler} style={{ minWidth: '25rem' }}  style={{margin:'1rem'}} label="option D" variant="outlined" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <FormControl component="fieldset" style={{ border: '1px solid #ccc', padding: '0.5rem 1rem', marginTop: '1rem' }}>
                            <FormLabel component="legend">Correct Option</FormLabel>
                            < RadioGroup row
                                aria-label="correctOption"
                                name="row-radio-buttons-group"
                                value={correctOption}
                                onChange={correctOptionHandler} >
                                <FormControlLabel value="A" control={<Radio />} label="A" />
                                <FormControlLabel value="B" control={<Radio />} label="B" />
                                <FormControlLabel value="C" control={<Radio />} label="C" />
                                <FormControlLabel value="D" control={<Radio />} label="D" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <Button variant="contained" onClick={saveButtonHandler} >Save</Button>
                <span style={{margin: '0.5rem'}}>{errorMessage}</span>
               </div>
        </div>
    )
}

export default QuizQuestionCard;
