import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const NewAssignmentFaculty = ({newAssignmentState}) => {

    const history = useHistory();
    const [assignmentID, setAssignmentID] = useState('');
    const [assignmentQuestion, setAssignmentQuestion] = useState('');
    const [courseID, setCourseID] = useState('');
    const [maxMarks, setMaxMarks] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');

    const assignmentIDHandler = (e) => {
        setAssignmentID(e.target.value);
    }

    const assignmentQuestionHandler = (e) => {
        setAssignmentQuestion(e.target.value);
    }

    const courseIDHandler = (e) => {
        setCourseID(e.target.value);
    }
    
    const maxMarksHandler = (e) => {
        setMaxMarks(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            token: localStorage.getItem('token'),
            assignmentID: assignmentID,
            assignmentQuestion: assignmentQuestion,
            courseID: courseID,
            maxMarks: maxMarks
        }

        axios.post('http://localhost:3001/api/newAssignmentFaculty', data)
        .then(response => {
            if(response.data === 'duplicate'){
                setErrorMessage("Assignment Already Exists!");
            } else if(response.data === 'Access Denied'){
                setErrorMessage("You are not Authorized to give assignment in this course");
            } else {
                if(response.data === 'success'){
                    newAssignmentState(false);
                }
                setErrorMessage(response.data);
            }
        })
        .catch(err => {
            setErrorMessage('Unexpected Error! Please contact the administrator.');
        })
    }

    return (
        <div style={{ width: '100%' }}>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="courseDetails" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField value={assignmentID} onChange={assignmentIDHandler} id="assignmentID" label="Assignment Number" variant="standard"  />
                    <TextField value={courseID} onChange={courseIDHandler} id="courseID" label="Course ID" variant="standard" style={{margin: '1rem'}} />
                    <TextField value={maxMarks} onChange={maxMarksHandler} id="max_marks" label="Max Marks" variant="standard" style={{margin: '1rem'}} />
                    <TextField value={assignmentQuestion} onChange={assignmentQuestionHandler} id="assignmentQuestion" label="Assignment Question" multiline minRows="10" style={{margin: '1rem', width: '100%'}}/>
                </div>
                <div style={{margin: '1rem'}}>{errorMessage}</div>
                <Button onClick={submitHandler} variant="contained">Save</Button>
            </form>
        </div>
    )
}

export default NewAssignmentFaculty
