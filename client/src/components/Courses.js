import axios from "axios";
import { useHistory } from 'react-router';
import { useEffect } from "react";
import { useState } from "react";
import ActionAreaCard from "./ActionAreaCard";

const Courses = () => {
    const token = localStorage.getItem('token');
    const data = { token: localStorage.getItem('token') };
    const history = useHistory();
    const [courseList, setCourseList] = useState('');
    let courses = '';

    if (data === 'null' || !data) {
        history.push('/');
    }

    useEffect(() => {
        apiCall();
    }, [])


    const apiCall = async () => {
        axios.post('http://localhost:3001/api/courses', data)
            .then(response => {
                setCourseList(response.data);
            })
            .catch(err => {
                console.log('Error');
            })
    }

    return (
        <>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                {courseList.length > 0 && courseList.map(course => {
                    return (< ActionAreaCard key={course.course_id} courseName={course.course_name} courseID={course.course_id} />)
                })}
            </div>
        </>
    )
}

export default Courses