import React from 'react';

import '../App.css';

/** Components */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Path } from './paths';
import Home from '../pages/Home';

/** Pages */

const AppRoutes = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Header />
                </header>
                <Routes>
                    <Route path={Path.Home} element={<Home />} />
                </Routes>
            </div>
        </Router>
    )
};

export default AppRoutes;