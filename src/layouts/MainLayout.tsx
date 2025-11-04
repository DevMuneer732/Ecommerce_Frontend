import React from 'react';
import { Outlet } from 'react-router-dom';
import { Content } from './content';
import { Footer } from './footer';
import { Header } from './header';
import Navbar from './navbar';


export const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Content>
                {/* Child routes (Shop, Cart, Home) will be rendered here */}
                <Outlet />
            </Content>
            <Footer />
        </>
    );
};