import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NavBar from "../NavBar";
import jwt_decode from "jwt-decode";
import AssignmentCardFaculty from "../AssignmentCardFaculty";

const AssignmentPage = () => {

    const localToken = localStorage.getItem('token');
    const userType = jwt_decode(localToken).userType;
    const rollno = jwt_decode(localToken).rollno;
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
    const [studentAssignmentList, setStudentAssignmentList] = useState('');

    if (data === 'null' || !data) {
        history.push('/');
    }

    useEffect(() => {
        apiCall();
    }, [])

    const Input = styled('input')({
        display: 'none',
    });

    const apiCall = async () => {
        axios.post('http://localhost:3001/api/assignments', data)
            .then(response => {
                // console.log(response);
                if (userType === 'student') {
                    setAssignment(response.data[0]);
                } else {
                    setAssignment(response.data[0]);
                    setStudentAssignmentList(response.data);
                }
            })
            .catch(err => {
                console.log(err);
                console.log('Error');
            })
    }

    const fileChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const submitHandler = (e) => {

        const formData = new FormData();
        formData.append('rollno', rollno);
        formData.append('userType', userType);
        formData.append('assignmentid', assignmentid);
        formData.append('file', selectedFile);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const url = 'http://localhost:3001/api/studentAssignmentSubmit';

        axios.post(url, formData, config)
            .then(response => {
                if (response.data === 'success') {
                    setErrorMessage("Successfully uploaded");
                } else if (response.data === 'duplicate') {
                    setErrorMessage("A previous submission already exists");
                } else {
                    setErrorMessage("Unknown error. Contact the administrator")
                }
            })
            .catch(err => {
                console.log('err', err);
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
                        {
                            userType === 'student' &&
                            <div>
                                <strong>  Marks: </strong>
                                {<span>{assignment.marks_obtained} out of {assignment.max_marks}</span>}
                            </div>
                        }
                        {
                            userType === 'faculty' &&
                            <div>
                                <strong>  Max Marks: </strong>
                                {assignment.max_marks}
                            </div>
                        }
                    </div>
                    <div className="row2" style={{ margin: '1rem', maxWidth: '70vw', marginBottom: '2rem' }}>
                        <strong> Question: </strong>
                        {assignment.question}
                    </div>

                    {userType === 'student' && <div className="uploadFile" style={{ margin: '1rem', textAlign: 'center' }}>
                        <div style={{ border: '2px solid #333', padding: '1rem' }}>
                            <label htmlFor="contained-button-file" >
                                {isFilePicked && (
                                    <div style={{ textAlign: 'center' }}>
                                        <p>Filename: {selectedFile.name}</p>
                                        <p>Filetype: {selectedFile.type}</p>
                                        <p>Size: {selectedFile.size} bytes</p>
                                    </div>)
                                }
                                <Input onChange={fileChangeHandler} accept="file" name="uploaded_file" id="contained-button-file" type="file" />
                                <Button variant="contained" component="span" startIcon={<AttachFileIcon />}>
                                    Upload File
                                </Button>
                            </label>
                        </div>
                        <div className="errorMessage" style={{ marginTop: '1rem' }}>{errorMessage}</div>
                    </div>}
                    {userType === 'student' && <Button variant="contained" onClick={submitHandler}>Submit</Button>}

                    {userType === 'faculty' && studentAssignmentList.length > 0 && studentAssignmentList.map((ass) => {
                        // console.log(1);
                        return(<AssignmentCardFaculty rollno={ass.student_id} maxMarks={ass.max_marks} marksObtainedDB={ass.marks_obtained} courseID={ass.course_id} assignmentID={ass.assignment_id} />)
                    })}
                </div>
            </div>
        </>
    )
}

export default AssignmentPage
