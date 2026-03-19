import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass mt-20 py-8 text-center border-t border-l-0 border-r-0 border-b-0 rounded-none">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-coffee-700 dark:text-coffee-300 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Sonu Prasad. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a href="https://github.com/sonuparsad1" target="_blank" rel="noopener noreferrer" className="text-coffee-500 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/spsaharan/" target="_blank" rel="noopener noreferrer" className="text-coffee-500 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://x.com/iamsonuparsad" target="_blank" rel="noopener noreferrer" className="text-coffee-500 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="mailto:sonusa470@gmail.com" className="text-coffee-500 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
