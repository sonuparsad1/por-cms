import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';

const VisualThemeInjector = () => {
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        if (!settings) return;
        
        const root = document.documentElement;
        
        // Colors
        if (settings.primaryColor) {
            root.style.setProperty('--bg-primary', settings.primaryColor);
            
            // Derive RGB for Glass & Border
            const hex = settings.primaryColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            // 85% opacity glass matching the primary background
            root.style.setProperty('--bg-glass', `rgba(${r}, ${g}, ${b}, 0.85)`);
            
            // Subtle 15% opacity border (light or dark depending on brightness)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            const borderColor = brightness > 125 ? '0, 0, 0' : '255, 255, 255';
            root.style.setProperty('--border', `rgba(${borderColor}, 0.1)`);
        }
        
        if (settings.accentColor) {
            root.style.setProperty('--accent', settings.accentColor);
            // Derive RGB for opacity usage if needed
            const hex = settings.accentColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
            root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
        }
        
        // Typography
        if (settings.fontFamily) {
            root.style.setProperty('--font-family', settings.fontFamily);
            // Also inject Google Font if it's one of our presets
            if (!settings.fontFamily.includes('system-ui')) {
                const fontName = settings.fontFamily.split(',')[0].replace(/'/g, '').replace(/ /g, '+');
                let link = document.getElementById('dynamic-google-font');
                if (!link) {
                    link = document.createElement('link');
                    link.id = 'dynamic-google-font';
                    link.rel = 'stylesheet';
                    document.head.appendChild(link);
                }
                link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;700;900&display=swap`;
            }
        }
        
        // Shape
        if (settings.borderRadius !== undefined) {
            root.style.setProperty('--border-radius', `${settings.borderRadius}px`);
        }
        
    }, [settings]);

    return null;
};

export default VisualThemeInjector;
