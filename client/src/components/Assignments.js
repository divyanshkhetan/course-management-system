import axios from "axios";
import { useHistory } from 'react-router';
import { useEffect } from "react";
import { useState } from "react";
import ActionAreaCardAssignment from "./ActionAreaCardAssignment";

const Assignments = () => {
    const token = localStorage.getItem('token');
    const data = { token: localStorage.getItem('token'), assignmentid:'null' };
    const history = useHistory();
    const [assignmentList, setAssignmentList] = useState('');

    if (data === 'null' || !data) {
        history.push('/');
    }

    useEffect(() => {
        apiCall();
    }, [])


    const apiCall = async () => {
        axios.post('http://localhost:3001/api/assignments', data)
            .then(response => {
                setAssignmentList(response.data);
            })
            .catch(err => {
                console.log('Error');
            })
    }

    return (
        <>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                {assignmentList.length > 0 && assignmentList.map(assignment => {
                    return (< ActionAreaCardAssignment key={assignment.assignment_id} question={assignment.question} assignmentID={assignment.assignment_id} courseID={assignment.course_id}/>)
                })}
            </div>
        </>
    )
}

export default Assignments
