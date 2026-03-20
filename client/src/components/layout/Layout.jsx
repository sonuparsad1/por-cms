import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-24 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
