import { useParams } from "react-router";
import './CoursePage.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";

const CoursePage = () => {
    const { courseid } = useParams();
    const [courseName, setCourseName] = useState('');

    axios.post('http://localhost:3001/api/courseDetailsStudent', { token: localStorage.getItem('token'), courseID: courseid })
        .then()
        .catch(err => console.log('error'));


    return (
        <div>
            <div className="container3">
                <div className="container4">
                    <img src="/course.jpg" alt="" srcset="" />
                    <h3></h3>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        Delete Course
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CoursePage
