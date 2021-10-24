import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const NewCourse = () => {
    
    const history = useHistory();
    const [courseID, setCourseID] = useState('');
    const [courseName, setCourseName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const courseIDHandler = (e) => {
        setCourseID(e.target.value)
    };

    const courseNameHandler=(e) => {
        setCourseName(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            token: localStorage.getItem('token'),
            courseID: courseID,
            courseName: courseName
        }
        if(courseID !== ''){
            axios.post('http://localhost:3001/api/newCourse', data)
        .then(response => {
            if(response.data === 'duplicate'){
                setErrorMessage('Course ID already exists. Try a different ID');
            } else if(response.data === 'success'){
                setErrorMessage('Success!');
                history.push('/');
            } else {
                setErrorMessage('Unexpected Error! Please contact the administrator.')
            }
        })
        .catch(err => {
            setErrorMessage('Unexpected Error! Please contact the administrator.')
        })
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="courseDetails" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TextField value={courseID} onChange={courseIDHandler} id="courseID" label="Course ID" variant="standard" />
                    <TextField value={courseName} onChange={courseNameHandler} id="courseName" label="Course Name" variant="standard" />
                </div>
                <div style={{marginTop: '1rem'}}>{errorMessage}</div>
                <Button onClick={submitHandler} variant="contained" style={{ margin: '1rem' }}>Save</Button>
            </form>
        </div>
    )
}

export default NewCourse
