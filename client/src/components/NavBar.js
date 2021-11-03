import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import jwt_decode from "jwt-decode";
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import { useState } from 'react';

import './Navbar.css';

const NavBar = () => {
    const history = useHistory();
    const [tokenPresent, setTokenPresent] = useState(false);

    if(localStorage.getItem('token') !== 'null'){
        axios.post('http://localhost:3001/tokenCheck', {token: localStorage.getItem('token')})
        .then(res => {
            if(res.data === 'valid'){
                setTokenPresent(true);
            } else {
                history.push('/');
            }
        })
        .catch(err => localStorage.setItem('token', null));
    } else {
        history.push('/');
    }

    const localToken = localStorage.getItem('token');

    if(localToken === null){
        history.push('/');
    }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = () => {
        localStorage.setItem('token', null);
        history.push('/');
    }
    const myAccountHandler = () => {
        history.push('/profile');
    }


    return (
        <div className="navbar">
                <div className="branding">Course Management System</div>
                <div className="profile">
                    <Button
                        variant="outlined"
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {tokenPresent && jwt_decode(localToken).fname}
                        < ArrowDropDownIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={(event) => { handleClose(); myAccountHandler(); }}>My account</MenuItem>
                        <MenuItem onClick={(event) => { handleClose(); logoutHandler(); }}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
    )
}

export default NavBar
