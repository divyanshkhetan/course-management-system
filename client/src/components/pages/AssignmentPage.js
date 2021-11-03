import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import NavBar from "../NavBar";


const AssignmentPage = () => {

    const { assignmentid } = useParams();
    const data = {
        token: localStorage.getItem('token'),
        assignmentid: assignmentid
    };
    const history = useHistory();
    const [assignment, setAssignment] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (data === 'null' || !data) {
        history.push('/');
    }

    useEffect(() => {
        apiCall();
    }, [])

    useEffect(() => {
        console.log(assignment)
    }, [assignment])


    const Input = styled('input')({
        display: 'none',
    });

    const apiCall = async () => {
        axios.post('http://localhost:3001/api/assignments', data)
            .then(response => {
                setAssignment(response.data[0]);
            })
            .catch(err => {
                console.log('Error');
            })
    }

    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const submitHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            file: selectedFile
        };

        axios.post('http://localhost:3001/api/assignmentSubmission', data)
        .then(response => {
            if(response.data === 'success'){

            }
        })
        .catch(err => {
            setErrorMessage('Unexpected Error! Please contact the administrator.')
            console.log("ERROR");
        })
    }

    return (
        <>
            <NavBar />
            <div style={{ width: '80vw', margin: 'auto' }}>


                <div style={{ width: '70vw', margin: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="row1" style={{ margin: '1rem 0rem', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div>
                            <strong>Course ID: </strong>
                            {assignment.course_id}
                        </div>
                        <div>
                            <strong>  Assignment ID: </strong>
                            {assignment.assignment_id}
                        </div>
                    </div>
                    <div className="row2" style={{ margin: '1rem', maxWidth: '70vw' }}>
                        <strong> Question: </strong>
                        {assignment.question}
                    </div>

                    <div className="uploadFile" style={{ margin: '1rem', textAlign:'center' }}>
                        <div style={{border:'2px solid #333', padding: '1rem'}}>
                            <label htmlFor="contained-button-file" >
                                {isFilePicked && (
                                    <div style={{textAlign:'center'}}>
                                        <p>Filename: {selectedFile.name}</p>
                                        <p>Filetype: {selectedFile.type}</p>
                                        <p>Size in bytes: {selectedFile.size}</p>
                                    </div>)
                                    }
                                <Input onChange={fileChangeHandler} accept="file" id="contained-button-file" type="file" />
                                <Button variant="contained" component="span" startIcon={<AttachFileIcon />}>
                                    Upload File
                                </Button>
                            </label>
                        </div>
                                <div className="errorMessage" style={{marginTop:'1rem'}}>{errorMessage}</div>
                    </div>

                    <Button variant="contained" onClick={submitHandler}>Submit</Button>                    
                </div>
            </div>
        </>
    )
}

export default AssignmentPage
