import React from 'react';
import { Section } from './Section';
import { SOCIAL_LINKS } from '../constants';

export const Contact: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This is a dummy handler. In a real app, you'd send the data to a backend.
        const form = e.target as HTMLFormElement;
        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
    };

    return (
        <Section id="contact" title="Get In Touch">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg text-slate-400 mb-8">
                    I'm currently seeking graduate opportunities and am open to new challenges. If you have a role that might be a good fit, or just want to connect, please feel free to reach out. Let's build something amazing together!
                </p>

                <form 
                    onSubmit={handleSubmit} 
                    className="max-w-xl mx-auto mt-12 text-left bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700"
                    aria-label="Contact form"
                >
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-300">Name</label>
                        <input type="text" id="name" name="name" required className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors duration-300" placeholder="Your Name" />
                    </div>
                     <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Email</label>
                        <input type="email" id="email" name="email" required className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors duration-300" placeholder="your.email@example.com" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-slate-300">Company Name</label>
                        <input type="text" id="company" name="company" className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors duration-300" placeholder="Your Company" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-300">Message</label>
                        <textarea id="message" name="message" rows={4} required className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors duration-300" placeholder="Your message..."></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                        >
                            Get In Touch
                        </button>
                    </div>
                </form>

                <div className="mt-16">
                    <p className="text-slate-400 mb-4">You can also find me on:</p>
                    <div className="flex justify-center items-center gap-6">
                        {SOCIAL_LINKS.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.url}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label={link.name}
                                className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
                            >
                                <link.icon className="w-8 h-8" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};