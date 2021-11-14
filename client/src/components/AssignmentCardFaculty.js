import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import axios from 'axios';
import download from 'downloadjs';


const AssignmentCardFaculty = ({ rollno, marksObtainedDB, maxMarks, courseID, assignmentID }) => {

    const [marksObtained, setMarksObtained] = useState(marksObtainedDB);

    const marksObtainedHandler = (e) => {
        setMarksObtained(e.target.value);
    }

    const saveMarksHandler = () => {

    }
    
    const fileDownloadHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            rollno: rollno,
            assignmentid: assignmentID
        }
        // console.log(data);
        axios.post('http://localhost:3001/api/assignmentFileDownloader', data)
        .then(response => {
            console.log(response);
            download(response, "assignment.pdf", "application/pdf");
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

                    <Button variant="contained" onClick={saveMarksHandler} >Save</Button>
                </div>

            </div>
        </div>
    )
}

export default AssignmentCardFaculty
