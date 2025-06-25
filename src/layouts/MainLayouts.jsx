import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Nav/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default MainLayouts;