import React from 'react';

import { AppBar, Box, Typography } from '@mui/material';

import logo from '../../logo.svg';

import { HeaderStyles } from './styles';

const Header = () => {
    return (
        <AppBar id={'task-app-header'} sx={HeaderStyles}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <img src={logo} style={{ width: 56, height: 56 }} className="App-logo" alt="logo" />
                <Typography sx={{ fontSize: 28, fontWeight: 'bold' }} id={'nav-home'} className={'NavMenu'}>
                    {'Task Management'}
                </Typography>
            </Box>
        </AppBar>
    );
};

export default Header;