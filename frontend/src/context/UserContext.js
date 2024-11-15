import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Failed to decode token", error);
                setUser(null);
            }
        }
    }, []);

    const updateUserProfile = (updatedData) => {
        setUser((prev) => ({
            ...prev,
            ...updatedData,
        }));
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUserProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);