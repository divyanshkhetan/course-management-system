import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [rollno, setRollno] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const handleChangeFname = (e) => {
        setFname(e.target.value);
    }
    const handleChangeLname = (e) => {
        setLname(e.target.value);
    }
    const handleChangeRollno = (e) => {
        setRollno(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
            fname: fname,
            lname: lname,
            rollno: rollno,
            email: email,
            password: password,
            userType: userType
        };
        axios.post('http://localhost:3001/api/signup', data)
        .then((result) => {
            console.log(result.data);
            if(result.data === 'duplicate'){
                setErrorMessage('User Already Exists!');
            } else if(result.data === 'success'){
                setErrorMessage('Account Successfully Created!');
            } else {
                setErrorMessage('Unexpected Error Occured. Contact the administrator or try again in a few moments!');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="container-y">
            <div className="lock-icon-background">
                <LockOutlinedIcon style={{ color: 'white' }} />
            </div>
            <div className="heading">Sign-Up</div>

            <form onSubmit={handleSubmit} style={{ minWidth: '25vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <TextField id="fname"
                        label="First Name"
                        varient="outlined"
                        type="text"
                        value={fname}
                        onChange={handleChangeFname}
                        required
                        style={{margin: "0px 0.5rem 0px 0px"}}
                    />
                    <TextField id="lname"
                        label="Last Name"
                        varient="outlined"
                        type="text"
                        value={lname}
                        onChange={handleChangeLname}
                        required
                        style={{margin: "0px 0px 0px 0.5rem"}}
                    />
                </div>
                <TextField id="rollno"
                    label="Roll Number"
                    variant="outlined"
                    type="text"
                    value={rollno}
                    onChange={handleChangeRollno}
                    required
                    style={{ width: '100%', margin: '1rem' }} />
                <TextField id="email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    required
                    style={{ width: '100%' }} />
                <TextField id="password"
                    label="Password"
                    varient="outlined"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    required
                    style={{ width: '100%', margin: '1rem', marginBottom: '1rem', marginTop: '1rem' }} />

                <RadioGroup row aria-label="user-type" name="user-type" onChange={handleChangeUserType} value={userType} style={{marginBottom: '1rem'}}>
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
                </RadioGroup>
            <Button type="submit" className="submit" variant="contained">Sign Up</Button>
            <Link to="/login" style={{margin: '1rem'}}>Already have an account?</Link>
        </form>
        <div className="errorMessage">{errorMessage}</div>

        </div >
    )
}

export default Login
