import { useState } from "react";
import './Profile.css';
import TextField from '@mui/material/TextField';

const Profile = () => {

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
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <div className="container">
                <div className="picside"></div>
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
                        style={{ margin: "1rem 0px 0px 0rem" }} />

                </div>
            </div>
        </div>
    )
}

export default Profile
