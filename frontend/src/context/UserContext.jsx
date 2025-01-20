import { createContext, useContext, useState, useEffect } from "react";
const USER_URL = import.meta.env.VITE_BACKEND_USER_URL

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Fetch user from backend on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${USER_URL}/auth`, {
                    method: "GET",
                    credentials: "include", // ✅ Sends the cookie
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data); // ✅ Set user from backend
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []); // Runs only on first render

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
