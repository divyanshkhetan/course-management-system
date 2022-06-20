import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import axios from 'axios';
import download from 'downloadjs';


const AssignmentCardFaculty = ({ rollno, marksObtainedDB, maxMarks, courseID, assignmentID }) => {

    const [marksObtained, setMarksObtained] = useState(marksObtainedDB);
    const [errorMessage, setErrorMessage] = useState('');

    const marksObtainedHandler = (e) => {
        setMarksObtained(e.target.value);
    }

    const saveMarksHandler = () => {
        const data = {
            token: localStorage.getItem('token'),
            assignmentid: assignmentID,
            studentid: rollno,
            marks: marksObtained
        }

        axios.post('http://localhost:3001/api/save/assignmentMarks', data)
        .then(response => {
            setErrorMessage(response.data);
        })
        .catch(err => console.log('error'));
    }
    
    const fileDownloadHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            rollno: rollno,
            assignmentid: assignmentID,
            marks: marksObtained
        }
        // console.log(data);
        axios.post('http://localhost:3001/api/assignmentFileDownloader', data, {responseType: 'arraybuffer'})
        .then(response => {
            // console.log(response);
            const blob = new Blob([response.data], {type: 'application/pdf'});
            download(blob, `${assignmentID} - ${rollno}.pdf`, 'application/pdf');
            
        })
        .catch(err => {
            console.log(err);
            console.log('error');
        })
    }

    return (
        <div >
            <div className="outer" style={{ border: '1px solid #888', borderRadius: '10px', padding: '0.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div className="header">
                    <h2> {rollno}  -  {courseID}  - {assignmentID} </h2>
                </div>
                <div className="file" style={{ marginBottom: '0.9rem' }}>
                    <Button onClick={fileDownloadHandler} startIcon={<AttachFileIcon />} variant="text" > {assignmentID} - {rollno} </Button>
                </div>
                <div className="marks" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '1rem' }} >
                        <TextField value={marksObtained} onChange={marksObtainedHandler} id="filled-basic" variant="filled" style={{ margin: '10px' }} />
                        <span style={{ fontSize: '1.5rem' }}> out of {maxMarks}</span>
                    </div>

                    <Button style={{marginRight: '0.5rem'}} variant="contained" onClick={saveMarksHandler} >Save</Button>
                    {errorMessage}
                </div>

            </div>
        </div>
    )
}

export default AssignmentCardFaculty
