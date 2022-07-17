import React from 'react';

import { AppBar, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import logo from '../../logo.svg';

import { HeaderStyles } from './styles';

const Header = () => {
    return (
        <AppBar sx={HeaderStyles}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <img src={logo} style={{ width: 56, height: 56 }} className="App-logo" alt="logo" />
                <NavLink style={{ fontSize: 28, fontWeight: 'bold' }} id={'nav-home'} className={'NavMenu'} to={'/'}>{'Task Management'}</NavLink>
            </Box>
            <Box display={'flex'} flexDirection={'row'} gap={2}>
                {/* <NavLink id={'nav-about'} className={'NavMenu'} to={'/about'}>About</NavLink> */}
            </Box>
        </AppBar>
    );
};

export default Header;