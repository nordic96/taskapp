import React from 'react';
import { CircularProgress } from '@mui/material';

const HomePageNode = React.lazy(() => import('./Home'));

const HomePage = () => {
    return(
        <React.Suspense fallback={<CircularProgress />}>
            <HomePageNode />
        </React.Suspense>
    )
};

export default HomePage;
