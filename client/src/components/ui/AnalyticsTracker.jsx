import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            try {
                // Generate a simple session ID if not exists
                let sessionID = sessionStorage.getItem('cms_session_id');
                if (!sessionID) {
                    sessionID = Math.random().toString(36).substring(2, 15);
                    sessionStorage.setItem('cms_session_id', sessionID);
                }

                const page = location.pathname === '/' ? 'home' : location.pathname.substring(1);
                
                // Don't track admin pages for public analytics
                if (page.startsWith('admin')) return;

                await fetch('/api/analytics/pageview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page,
                        referrer: document.referrer,
                        sessionID
                    })
                });
            } catch (err) {
                // Silently fail analytics
                console.debug('Analytics error:', err);
            }
        };

        trackPageView();
    }, [location]);

    return null;
};

export default AnalyticsTracker;
