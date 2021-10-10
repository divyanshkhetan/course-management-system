import * as React from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>


            <div class="wave-container">
                <div className="Navbar">
                    <span className="logo"></span>
                    <span className="buttons-right">
                        <Link to="/signup">
                            <Button variant="contained" className="sign-up" style={{margin: '0.5rem', maxHeight: '3rem'}}>Sign-Up</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="text" className="login" style={{margin: '0.5rem', maxHeight: '3rem'}}>Login</Button>
                        </Link>
                    </span>
                </div>
                <h1>Course Management System</h1>
                <p>A better way for academic interactions</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,245.3C672,256,768,256,864,229.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>


        </div>
    )
}

export default Home
