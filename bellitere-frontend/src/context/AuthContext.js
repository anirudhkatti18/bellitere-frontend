"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * AuthProvider wraps global states for tracking authenticating login sheets,
 * stub session values, and localStorage context hydration on browser mount.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Read session credentials on mount to restore user context
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("bellitere_session");
            const storedUser = localStorage.getItem("bellitere_user");
            if (storedToken && storedUser) {
                setToken(storedToken);
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                }
            }
        }
        setLoading(false);
    }, []);

    const login = async (phone, otp) => {
        setLoading(true);
        try {
            // Stub login verification transition
            const dummyToken = "stub_token_" + Math.random().toString(36).substring(2, 11);
            const dummyUser = { id: "user_stub", phone, name: "Kannada Cinephile" };

            if (typeof window !== "undefined") {
                localStorage.setItem("bellitere_session", dummyToken);
                localStorage.setItem("bellitere_user", JSON.stringify(dummyUser));
            }

            setToken(dummyToken);
            setUser(dummyUser);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        setLoading(true);
        if (typeof window !== "undefined") {
            localStorage.removeItem("bellitere_session");
            localStorage.removeItem("bellitere_user");
        }
        setToken(null);
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
