import * as React from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';


const Home = () => {
    return (
        <div className="main-div">

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
                <div className="container">
                <h1>Course Management System</h1>
                <h3>A better way for academic interactions</h3>
                With the advent of the first COVID-19 wave, the students started facing a lot of trouble to cope up with the academic curriculum without a proper platform to hold on to their academic records and facilitate the interaction with their respective institutions. This Course Management System is an attempt to:
                <br />
                <br />
                <CheckCircleSharpIcon style={{display: 'inline-block', color: 'Green'}}/> <span>Facilitate the submission of assignments.</span>  <br />
                <CheckCircleSharpIcon style={{display: 'inline-block', color: 'Green'}}/> <span>Help in conducting the quizes in a better fashion.</span> <br />
                <CheckCircleSharpIcon style={{display: 'inline-block', color: 'Green'}}/> <span> Give an overview of the performance in various courses taken by a student.</span> <br />
                </div>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 700" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150 waves-svg"><path d="M 0,500 C 0,500 0,250 0,250 C 189.7333333333333,213.06666666666666 379.4666666666666,176.13333333333335 543,186 C 706.5333333333334,195.86666666666665 843.8666666666666,252.53333333333336 989,271 C 1134.1333333333334,289.46666666666664 1287.0666666666666,269.73333333333335 1440,250 C 1440,250 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="#0099ffff" className="transition-all duration-300 ease-in-out delay-150 path-0 waves-path"></path></svg>    
            </div>
        </div>
    )
}

export default Home
