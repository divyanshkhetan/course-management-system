import './Dashboard.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import jwt_decode from "jwt-decode";
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import VerticalTabs from '../VerticalTabs';
import NavBar from '../NavBar';

const Dashboard = () => {

    return (
        <div>
            <NavBar />
            
            <div className="main">
                <VerticalTabs />                
            </div>            
        </div>
    )
}

export default Dashboard
