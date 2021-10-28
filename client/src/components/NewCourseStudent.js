import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';


const NewCourseStudent = () => {

    const history = useHistory();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        apiCall();
    }, [])

    const apiCall = async () => {
        axios.post('http://localhost:3001/api/showNewCourses', {token: localStorage.getItem('token')})
        .then(response => {
            if(response.data === 'error'){
                console.log("Error");
            } else {
                setRows(response.data);     
            }
        })
        .catch(err => console.log('Error'));
    }

    const joinHandler = (e) => {
        const courseID = e.currentTarget.value;
        axios.post('http://localhost:3001/api/addNewCourseStudent', {token: localStorage.getItem('token'), courseID: courseID})
        .then(response => {
            if(response.data === 'success'){
                history.push('/');
            }
        })
        .catch(err => console.log("Error"));
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Course Name</TableCell>
                            <TableCell align="left">Course Code</TableCell>
                            <TableCell align="left">Join</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { rows.map(row => (
                            <TableRow
                                key={row.course_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.course_name}
                                </TableCell>
                                <TableCell align="left">{row.course_id}</TableCell>
                                <TableCell align="left"><Button onClick={joinHandler} value={row.course_id} variant="contained">Join</Button></TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default NewCourseStudent
