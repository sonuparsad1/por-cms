import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';

const SEOTags = ({ pageTitle, pageDescription, pageImage }) => {
    const { settings } = useContext(SettingsContext);
    const location = useLocation();

    useEffect(() => {
        if (!settings) return;

        // Base values from global settings
        const baseTitle = settings.metaTitle || settings.siteName || 'Sonu Prasad';
        const baseDesc = settings.metaDescription || settings.siteDescription || 'Portfolio & Blog';
        
        // Final values
        const finalTitle = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
        const finalDesc = pageDescription || baseDesc;

        // Update DOM
        document.title = finalTitle;
        
        // Update Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', finalDesc);

        // Update OG Tags
        const updateOg = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateOg('og:title', finalTitle);
        updateOg('og:description', finalDesc);
        updateOg('og:url', window.location.href);
        if (pageImage) updateOg('og:image', window.location.origin + pageImage);

        // Google Analytics (Optional / Simple injection)
        if (settings.googleAnalyticsId && !window.ga_initialized) {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`;
            script.async = true;
            document.head.appendChild(script);
            
            const configScript = document.createElement('script');
            configScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.googleAnalyticsId}');
            `;
            document.head.appendChild(configScript);
            window.ga_initialized = true;
        }

    }, [settings, pageTitle, pageDescription, pageImage, location]);

    return null; // Side-effect only component
};

export default SEOTags;
