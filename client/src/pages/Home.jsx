import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

// Import all Dynamic Templates
import CenteredHero from '../components/templates/home/CenteredHero';
import SplitScreen from '../components/templates/home/SplitScreen';
import AnimatedIntro from '../components/templates/home/AnimatedIntro';
import FuturisticAI from '../components/templates/home/FuturisticAI';
import SEOTags from '../components/ui/SEOTags';
import BlockRenderer from '../components/layout/BlockRenderer';

const Home = () => {
    const { settings, loading } = useContext(SettingsContext);

    // Initial Loading State gracefully protects layout shifts
    if (loading) {
        return (
            <div className="flex h-[75vh] items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-coffee-200 dark:border-white/10 border-t-coffee-600 dark:border-t-coffee-400 rounded-full animate-spin mb-4"></div>
                    <div className="text-coffee-500 font-mono text-xs tracking-widest uppercase">Booting Architecture...</div>
                </div>
            </div>
        );
    }

    const currentTemplate = settings?.homepageTemplate || 'Centered Hero';

    const renderSelectedTemplate = () => {
        switch (currentTemplate) {
            case 'Visual Builder': return <BlockRenderer blocks={settings?.blocks} />;
            case 'Centered Hero': return <CenteredHero settings={settings} />;
            case 'Split Screen': return <SplitScreen settings={settings} />;
            case 'Animated Intro': return <AnimatedIntro settings={settings} />;
            case 'Futuristic AI': return <FuturisticAI settings={settings} />;
            default: return settings?.blocks?.length > 0 ? <BlockRenderer blocks={settings.blocks} /> : <CenteredHero settings={settings} />;
        }
    };

    return (
        <>
            <SEOTags />
            {renderSelectedTemplate()}
        </>
    );
};

export default Home;
