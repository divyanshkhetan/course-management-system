import { useParams } from "react-router";
import './CoursePage.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router';

const CoursePage = () => {
    const { courseid } = useParams();
    const history = useHistory();
    const [aboutCourse, setAboutCourse] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        apiRequest();
    }, [])

    const apiRequest = () => {
        axios.post('http://localhost:3001/api/courseDetailsStudent', { token: localStorage.getItem('token'), courseID: courseid })
            .then(response => {
                console.log(response);
                setAboutCourse(response.data);
            })
            .catch(err => console.log('error'));
    }

    const deleteCourseHandler = (e) => {
        const data = {
            token: localStorage.getItem('token'),
            courseid: courseid
        };

        axios.post('http://localhost:3001/api/deleteCourse', data)
            .then(response => {
                if (response.data === 'success') {
                    history.push('/dashboard');
                } else {
                    setErrorMessage(response.data);
                }
            })
            .catch(err => {
                setErrorMessage('Unexpected Error! Please contact the admisitrator');
            })
    }

    return (
        <div>
            <div className="container3">
                <div className="container4">
                    <table style={{  width: '100%', columnGap: '5rem', textAlign: 'left', margin:'auto', marginBottom: '1rem', marginLeft: '10rem'}}>
                        <tr >
                            <td>
                                <div >
                                    <strong>Course ID: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[0].course_id}
                                </div>
                            </td>
                            <td>
                                <div>
                                    <strong>Course Name: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[0].course_name}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div >
                                    <strong>Instructor ID: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[0].instructor_id}
                                </div>

                            </td>
                            <td>
                                <div>
                                    <strong>Instructor Name: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[0].first_name}
                                    <span>&nbsp;</span>
                                    {aboutCourse.length > 0 && aboutCourse[0].last_name}
                                </div>
                            </td>
                        </tr>
                            
                        <tr>
                            <td>
                                <div>
                                    <strong>Total Number of Assignments: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[1].no_of_ass}
                                    {aboutCourse.length > 0 && aboutCourse[1].no_of_ass === null && '0'}
                                </div>
                            </td>

                            <td>
                                <div>
                                    <strong>Total Number of Quizes: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[2].no_of_quizes}
                                    {aboutCourse.length > 0 && aboutCourse[2].no_of_quizes === null && '0'}
                                </div>
                            </td>
                        </tr>
                            
                        <tr>
                            <td>
                                <div>
                                    <strong>Marks Scored in Assignments: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[1].ass_marks_obtnd}
                                    {aboutCourse.length > 0 && aboutCourse[1].ass_marks_obtnd === null && '0'}
                                </div>
                            </td>

                            <td>
                                <div>
                                    <strong>Marks Scored in Quizes: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[2].quiz_marks_obtnd}
                                    {aboutCourse.length > 0 && aboutCourse[2].quiz_marks_obtnd === null && '0'}
                                </div>
                            </td>
                        </tr>
                            
                        <tr>
                            <td>
                                <div>
                                    <strong>Maximum Marks in Assignments: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[1].ass_marks_total}
                                    {aboutCourse.length > 0 && aboutCourse[1].ass_marks_total === null && '0'}
                                </div>
                            </td>

                            <td>
                                <div>
                                    <strong>Maximum Marks in Quizes: </strong>
                                    {aboutCourse.length > 0 && aboutCourse[2].quiz_marks_total}
                                    {aboutCourse.length > 0 && aboutCourse[2].quiz_marks_total === null && '0'}
                                </div>
                            </td>
                        </tr>
                    </table>

                    <Button variant="outlined" onClick={deleteCourseHandler} color="error" startIcon={<DeleteIcon />}>
                        Delete Course
                    </Button>
                    {errorMessage}
                </div>
            </div>
        </div>
    )
}

export default CoursePage
