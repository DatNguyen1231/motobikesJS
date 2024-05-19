import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [qty, setQty] = useState(1);

    // Increase quantity
    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    // Decrease quantity
    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (token && userInfo) {
            setIsAuthenticated(true);
            setUserRole(userInfo.role);
        }
        setIsLoading(false);
    }, []);

    const isAdmin = () => userRole === 'ADMIN';

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userRole,
                isAdmin,
                isLoading,
                setIsAuthenticated,
                qty,
                increaseQty,
                decreaseQty,
                setQty,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
