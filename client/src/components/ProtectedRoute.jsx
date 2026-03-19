import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA] dark:bg-[#0A0908]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
