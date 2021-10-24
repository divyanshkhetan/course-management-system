import { useEffect, useState } from "react";
import './Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Redirect, useHistory} from 'react-router';

const Profile = () => {
    
    const history = useHistory();
    
    
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [rollno, setRollno] = useState(decoded.rollno);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(decoded.userType);

    const data = {
        token: token,
        userType: decoded.userType,
        rollno: decoded.rollno
    };

    if(fname === ''){
        axios.post('http://localhost:3001/api/profileInfo', data)
        .then(response => {
            setFname(response.data.fname);
            setLname(response.data.lname);
            setEmail(response.data.email);
        })
        .catch(err => console.log('error from axios'));
    }

    const handleChangeFname = (e) => {
        setFname(e.target.value);
    }
    const handleChangeLname = (e) => {
        setLname(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        const data = {
            token: token,
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            rollno: rollno,
            userType: userType
        }
        axios.post('http://localhost:3001/api/editProfile', data)
        .then(response => {
            console.log('success');
            if(response.data === 'success'){
                history.push('/dashboard');
            }
        })
        .catch(err => console.log(err));
    }
    

    return (
        <div>
            <div className="container1">
                <div className="picside">
                    <img src="/avatar.png" alt="Profile Pic" className="avatar" />
                </div>
                <div className="details">
                    <div className="personalInfo">Personal Information</div>
                    <hr />
                    <br />
                    <div>
                        <TextField id="fname"
                            label="First Name"
                            varient="outlined"
                            type="text"
                            value={fname}
                            onChange={handleChangeFname}
                            required
                            style={{ margin: "0px 0.5rem 0px 0px" }}
                        />
                        <TextField id="lname"
                            label="Last Name"
                            varient="outlined"
                            type="text"
                            value={lname}
                            onChange={handleChangeLname}
                            required
                            style={{ margin: "0px 0px 0px 0.5rem" }}
                        />
                    </div>

                    <TextField id="userType"
                        disabled
                        label="User Type"
                        variant="outlined"
                        type="text"
                        value={userType}
                        required
                        style={{ margin: "1rem 0px 0px 0rem" }} />

                    <TextField id="rollno"
                        disabled
                        label="Roll Number"
                        variant="outlined"
                        type="text"
                        value={rollno}
                        required
                        style={{ margin: "1rem 0px 0px 0rem" }} />


                    <TextField id="email"
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        required
                        style={{ margin: "1rem 0px 0px 0rem" }} />

                    <TextField id="password"
                        label="New Password (Enter if you want to reset)"
                        varient="outlined"
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        required
                        style={{ margin: "1rem 0px 1rem 0rem" }} />
                    <Button variant="contained" onClick={submitHandler}>Save</Button>  
                </div>
            </div>
        </div>
    )
}

export default Profile
