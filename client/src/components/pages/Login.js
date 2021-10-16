import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [rollno, setRollno] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    const [loggedIn, setLoggedIn] = useState(false);
    
    const handleChangeRollno = (e) => {
        setRollno(e.target.value);
    }
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleChangeUserType = (e) => {
        setUserType(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            rollno: rollno,
            password: password,
            userType: userType
        };

        axios.post('http://localhost:3001/api/login', data)
        .then(result => {
            if(result.data.token){
                setErrorMessage('User Authenticated!');
                localStorage.setItem('token', result.data.token);       // Token saved on local browser
                
                // redirect condition set true
                setLoggedIn(true);
            } else if(result.data === 'failed'){
                setErrorMessage('Wrong Password!');
            } else if(result.data === 'invalid'){
                setErrorMessage('User Not Found!');
            } else {
                setErrorMessage('Unexpected Error Occured. Contact the administrator or try again in a few moments!');
            }
        })
        .catch(err => {
            setErrorMessage('Unexpected Error Occured. Contact the administrator or try again in a few moments!');
        })
    }

    return (
        <div className="container-y">
            <div className="lock-icon-background">
                <LockOutlinedIcon style={{ color: 'white' }} />
            </div>
            <div className="heading">Login</div>

            <form onSubmit={handleSubmit} style={{ minWidth: '25vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField id="rollno"
                    label="Roll Number"
                    variant="outlined"
                    type="text"
                    required
                    onChange={handleChangeRollno}
                    value={rollno}
                    style={{ width: '100%', margin: '1rem' }} />
                <TextField id="password"
                    label="Password"
                    varient="outlined"
                    type="password"
                    onChange={handleChangePassword}
                    value={password}
                    required
                    style={{ width: '100%', marginTop: '0rem', marginBottom: '1rem' }} />

                <RadioGroup row aria-label="userType" name="userType" onChange={handleChangeUserType} value={userType} style={{marginBottom: '1rem'}}>
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
                </RadioGroup>
            <Button type="submit" className="submit" variant="contained" >Login</Button>
            
            <Link to="/signup" style={{margin: '1rem'}}>Create a new account?</Link>
        </form> 
        <div className="errorMessage">{errorMessage}</div>
        {loggedIn && <Redirect to="dashboard" />}
        </div >
    )
}

export default Login
