import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                // We configured our API to return { data: [settingsSingleton] } for CMS compatibility
                setSettings(data.data[0]); 
            }
        } catch (err) {
            console.error('Failed to load global settings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // Allows the CMS AdminDashboard to force a refresh on the frontend without a hard reload
    const refreshSettings = () => fetchSettings();

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
