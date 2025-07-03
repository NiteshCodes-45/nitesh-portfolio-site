import { motion } from "framer-motion";
import { useRef } from "react";
import { FcViewDetails } from "react-icons/fc";
export default function Hero({ toContact }) {
    return (
        <section className="text-center space-y-4">
            <motion.h1
                className="text-4xl md:text-6xl font-bold text-sky-700 dark:text-sky-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Hi, I'm Nitesh
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl text-sky-700 dark:text-sky-300 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                I’m a frontend developer helping businesses build responsive email templates &
            </motion.p>
            <motion.p
                className="text-lg md:text-xl text-sky-700 dark:text-sky-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                modern UIs using HTML, Tailwind, and React.
            </motion.p>
            <div className="flex space-x-4 mt-8 items-center justify-center">
                <button
                    onClick={toContact}
                    className="px-6 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-md hover:brightness-110 transition"
                >
                    Let's Work Together
                </button>
                <a
                    href="/Nitesh Chaughule.pdf"
                    target="_blank"
                    className="px-6 py-2 border border-sky-600 text-sky-600 dark:text-sky-300 dark:border-sky-400 rounded-md hover:bg-sky-100 dark:hover:bg-gray-800 transition"
                >
                    📄 View My Resume
                </a>
            </div>
        </section>
    );
} 