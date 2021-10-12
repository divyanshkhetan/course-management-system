import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';



const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    
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
        console.log({
            Email: email,
            Password: password,
            UserType: userType
        });
    }

    return (
        <div className="container-y">
            <div className="lock-icon-background">
                <LockOutlinedIcon style={{ color: 'white' }} />
            </div>
            <div className="heading">Login</div>

            <form onSubmit={handleSubmit} style={{ minWidth: '25vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField id="email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    required
                    onChange={handleChangeEmail}
                    value={email}
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

        </div >
    )
}

export default Login
