import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove all possible theme classes
        root.classList.remove('light', 'dark', 'luxury');
        // Add the current theme class
        root.classList.add(theme);
        // Persist
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (newTheme) => {
        if (newTheme) {
            setTheme(newTheme);
        } else {
            // Cycle through themes if no specific theme is provided
            setTheme(prev => {
                if (prev === 'light') return 'dark';
                if (prev === 'dark') return 'luxury';
                return 'light';
            });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
