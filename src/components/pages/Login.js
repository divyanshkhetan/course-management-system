import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container-y">
            <div className="lock-icon-background">
                <LockOutlinedIcon style={{ color: 'white' }} />
            </div>
            <div className="heading">Login</div>

            <form style={{ minWidth: '25vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField id="email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    required
                    style={{ width: '100%', margin: '1rem' }} />
                <TextField id="password"
                    label="Password"
                    varient="outlined"
                    type="password"
                    required
                    style={{ width: '100%', margin: '1rem', marginBottom: '1rem' }} />

                <RadioGroup row aria-label="user-type" name="user-type" style={{marginBottom: '1rem'}}>
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
                </RadioGroup>
            <Button type="submit" className="submit" variant="contained">Login</Button>
            
            <Link to="/signup" style={{margin: '1rem'}}>Create a new account?</Link>
        </form>

        </div >
    )
}

export default Login
