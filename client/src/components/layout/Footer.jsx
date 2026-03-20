import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass py-12 text-center border-t border-[var(--border)] bg-transparent">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[var(--text-secondary)] font-medium opacity-80">
                    &copy; {new Date().getFullYear()} Sonu Prasad. All rights reserved.
                </p>
                
                <div className="flex gap-6">
                    {[
                        { icon: Github, href: "https://github.com/sonuparsad1" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/spsaharan/" },
                        { icon: Twitter, href: "https://x.com/iamsonuparsad" },
                        { icon: Mail, href: "mailto:sonusa470@gmail.com" }
                    ].map((social, i) => (
                        <a 
                            key={i}
                            href={social.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all transform hover:scale-110 active:scale-95"
                        >
                            <social.icon size={22} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
