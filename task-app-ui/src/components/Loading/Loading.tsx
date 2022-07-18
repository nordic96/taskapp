import React from 'react';
import { Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingBox = () => {
    return (
        <Box width={'40vw'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
            <Skeleton width={'100%'} height={90} />
            <Skeleton width={'95%'} height={10} />
        </Box>
    );
};

const Loading = () => {
    return (
        <Box id={'loading-container'} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {new Array(4).fill(0).map((x, i) => {
                return <LoadingBox key={i} />;
            })}
        </Box>
    );
};

export default Loading;
