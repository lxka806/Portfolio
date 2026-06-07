import { createContext, useContext, useEffect, useState } from "react";

const WebsitesContext = createContext();

export const useWebsite = () => useContext(WebsitesContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState([]);

    const getWebsites = async () => {
        try {
            const res = await fetch(`${API_URL}/websites`);

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            const result = await res.json();
            setWebsites(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getWebsites();
    }, []);

    return (
        <WebsitesContext.Provider value={{ websites }}>
            {children}
        </WebsitesContext.Provider>
    );
};