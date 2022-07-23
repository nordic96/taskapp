import React from 'react';

import { Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'

/**
 * Individual Loading Box Component
 */
const LoadingBox = () => {
    return (
        <Box width={'40vw'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
            <Skeleton width={'100%'} height={90} />
            <Skeleton width={'95%'} height={10} />
        </Box>
    );
};

/**
 * Loading Indicator Component for TaskBox
 * @returns Loading Indicator of multiple Loading Box Components
 */
const Loading = () => {
    return (
        <Box id={'loading-container'} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {new Array(7).fill(0).map((x, i) => {
                return <LoadingBox key={i} />;
            })}
        </Box>
    );
};

export default React.memo(Loading);
