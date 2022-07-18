import React from 'react';
import { CircularProgress } from '@mui/material';
import wrapWithPageStyles from '../../components/wrapWithPageStyles';

const HomePageNode = React.lazy(() => import('./Home'));

const HomePage = () => {
    return(
        <React.Suspense fallback={<CircularProgress />}>
            <HomePageNode />
        </React.Suspense>
    )
};

export default wrapWithPageStyles(HomePage);
