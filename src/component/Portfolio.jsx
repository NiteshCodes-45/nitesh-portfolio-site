import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import FeaturedWork from "./FeaturedWork";
import Hero from "./Hero";
import ServiceOffered from "./ServiceOffered";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const contactRef = useRef(null);
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (darkMode) {
      html.classList.add("dark");
      body.classList.add("dark");
    } else {
      html.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="min-h-screen px-3 md:px-6 pb-0 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-8 md:mb-2 pt-4 px-4">
        {/* Logo */}
        <a
            href="/nitesh-portfolio-site/"    
            className="flex items-center gap-2"
        >
        <img src="./nc-logo.png" alt="NC Logo" className="h-10 w-auto" />
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* <Link to="/blog" className="text-sky-600 dark:text-sky-300 hover:underline hover:text-sky-800 dark:hover:text-sky-100 transition duration-300 font-semibold text-lg">Blog</Link> */}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded-full text-sky-600 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-800 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <Hero toContact={scrollToContact} />

      {/* Portfolio Section */}
      <FeaturedWork />

      {/* Services Section - Marquee Style */}
      <ServiceOffered />

      {/* About Section */}
      <section className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-sky-600 dark:text-sky-400">About Me</h2>
        <p className="text-sky-700 dark:text-sky-300">
          I'm a frontend developer with over 7 years of experience building scalable and clean UIs for startups and businesses. My recent focus is on high-converting email templates and interactive dashboards using React + Tailwind.
        </p>
        <p className="mt-4 text-sky-700 dark:text-sky-300">
          I care deeply about clean code, accessibility, usability, and performance. I love turning designs into pixel-perfect components that work everywhere.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-sky-600 dark:text-sky-400">Let's Get in Touch</h2>
        <p className="mb-1 text-sky-700 dark:text-sky-300">Have a project in mind? I'm available for freelance work.</p>
        <div className="flex justify-center space-x-4 text-xl mt-4">
          <a href="mailto:nitesh.chaughule5@gmail.com" className="text-sky-600 dark:text-sky-400" title="Email">
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/nitesh-chaughule-6637aa309"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-5 text-center text-sm text-sky-700 dark:text-sky-300 pt-6">
        <p>© {new Date().getFullYear()} <a href="https://github.com/NiteshCodes-45" target="_blank" rel="noopener noreferrer" title="GitHub">Nitesh Chaughule</a>. Made with React & Tailwind.</p>
      </footer>
    </main>
  );
}
