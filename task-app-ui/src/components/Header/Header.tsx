import React from 'react';

import { AppBar, Typography } from '@mui/material';

import { HeaderStyles } from './styles';

/**
 * Application Header Component
 */
const Header = () => {
    return (
        <AppBar id={'task-app-header'} sx={HeaderStyles}>
            <Typography sx={{ fontSize: 28, fontWeight: 'bold' }} id={'nav-home'} className={'NavMenu'}>
                {'Task Management'}
            </Typography>
        </AppBar>
    );
};

export default React.memo(Header);
