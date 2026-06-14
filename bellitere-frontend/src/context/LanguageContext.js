"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState("kn");

    useEffect(() => {
        const storedLang = localStorage.getItem("bellitere_lang");
        if (storedLang) {
            setLang(storedLang);
        }
    }, []);

    const handleSetLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem("bellitere_lang", newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
