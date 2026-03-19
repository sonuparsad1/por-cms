import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Bot, LineChart, Database, Cpu } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';

const AIShowcase = () => {
    // Interactive demo state mock for Sentiment Analyzer
    const [inputText, setInputText] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        setAnalyzing(true);
        setResult(null);
        
        // Mock analysis delay
        setTimeout(() => {
            const isPositive = inputText.length % 2 === 0;
            setResult({
                sentiment: isPositive ? "Positive" : "Negative",
                confidence: (Math.random() * (0.99 - 0.75) + 0.75).toFixed(2),
                score: isPositive ? 0.85 : 0.12
            });
            setAnalyzing(false);
        }, 1200);
    };

    return (
        <div className="py-12 max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <Bot size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">AI Showcase</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Interactive demonstrations of predictive models and ML architectures.</p>
            </motion.div>

            <div className="space-y-16">
                {/* 1. Sentiment Analyzer Demo */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <GlassCard className="overflow-hidden p-0">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-coffee-200 dark:border-white/10 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-coffee-900 dark:text-coffee-100 mb-4 flex items-center gap-3">
                                    <LineChart className="text-coffee-500" /> NLP Sentiment Pipeline
                                </h2>
                                <p className="text-coffee-700 dark:text-coffee-300 mb-6">
                                    Test a mock proxy of the sentiment analyzer model. Under the hood, the real model utilizes a custom LSTM architecture built with TensorFlow, achieving 92% accuracy on the IMDB dataset.
                                </p>
                                <div className="flex gap-4 mb-6">
                                    <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-xs font-mono rounded">TensorFlow</span>
                                    <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-xs font-mono rounded">Python</span>
                                    <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-xs font-mono rounded">NLP</span>
                                </div>
                            </div>
                            
                            <div className="p-8 md:p-10 bg-coffee-50/50 dark:bg-black/20 flex flex-col justify-center">
                                <form onSubmit={handleAnalyze} className="mb-6">
                                    <label className="block text-sm font-bold text-coffee-800 dark:text-coffee-200 mb-2">Try it out:</label>
                                    <textarea 
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="w-full bg-white dark:bg-[#0A0908] border border-coffee-200 dark:border-white/10 rounded-lg p-3 text-coffee-900 dark:text-coffee-100 focus:outline-none focus:border-coffee-500 transition-colors h-24 resize-none mb-3"
                                        placeholder="Type a sentence here..."
                                    />
                                    <PremiumButton type="submit" variant="primary" className="w-full justify-center" disabled={analyzing}>
                                        {analyzing ? 'Analyzing...' : 'Run Prediction'}
                                    </PremiumButton>
                                </form>

                                {result && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-4 border rounded-lg flex items-center justify-between ${result.sentiment === 'Positive' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'}`}
                                    >
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Result</div>
                                            <div className={`text-xl font-black ${result.sentiment === 'Positive' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                {result.sentiment}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Confidence</div>
                                            <div className="font-mono">{Math.round(result.confidence * 100)}%</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                </motion.section>

                {/* 2. Architecture Breakdown */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <GlassCard>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-coffee-900 dark:text-coffee-100">
                            <Database /> Data Preprocessing
                        </h3>
                        <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed text-sm">
                            I leverage Pandas for heavy data wrangling. Standard pipelines include missing value imputation via KNN, feature scaling (StandardScaler), and handling imbalanced classes through SMOTE or class-weighting techniques before model ingestion.
                        </p>
                    </GlassCard>
                    <GlassCard>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-coffee-900 dark:text-coffee-100">
                            <Cpu /> Model Architecture
                        </h3>
                        <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed text-sm">
                            Transitioning from baseline models (Logistic Regression, Random Forests) to complex architectures. Experience in designing custom Keras Sequential models equipped with Dropout layers to prevent overfitting on sparse datasets.
                        </p>
                    </GlassCard>
                </motion.section>
            </div>
        </div>
    );
};

export default AIShowcase;
