// AuthProvider.js
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const login = (username) => setUserDetails(username);
    const logout = () => setUserDetails(null);

    return (
        <AuthContext.Provider value={{ userDetails, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
