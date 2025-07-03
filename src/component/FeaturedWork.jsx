import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedWork() {
  const [selectedImage, setSelectedImage] = useState({
    image: null,
    link: null,
    type: null,
  });

  const projects = [
    {
      title: "Live Cricket Scoreboard",
      description: "Real-time score updates using React + Firebase.",
      image: "/projects/live-homepage.png",
      link: "https://live-score-cart.vercel.app/",
      tags: ["React", "Firebase", "Tailwind"],
      type: "web",
    },
    {
      title: "Responsive Invoice Email Template",
      description: "HTML email built with mobile-first design.",
      image: "/projects/full-email-template.png",
      link: "/portfolio-templates/invoice-email-template.html",
      tags: ["HTML", "Tailwind", "Email"],
      type: "email",
    },
    {
      title: "Product Launch Email Template",
      description: "Modern email template for product launches.",
      image: "/projects/product-launch-ss.png",
      link: "/portfolio-templates/product-launch-email-template.html",
      tags: ["UI", "Tailwind", "Email"],
      
    },
  ];

  return (
    <section className="mt-20 px-4 relative">
      <h2 className="text-2xl font-semibold text-center mb-8 text-sky-600 dark:text-sky-400">
        Featured Work
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl overflow-hidden transition transform hover:scale-[1.02] cursor-pointer"
            onClick={() => setSelectedImage({image: project.image, link: project.link, type: project.type})}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-300">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-sky-100 dark:bg-sky-700 dark:text-sky-100 text-sky-600 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal (Lightbox) Preview */}
      <AnimatePresence>
        {selectedImage.image && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage({ image: null, link: null, type: null })} // Close modal on background click
          >
            <motion.img
              src={selectedImage.image}
              alt="Preview"
              className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg border border-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <motion.a
              href={selectedImage.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-8 right-8 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on link click
            >
              {selectedImage.type === "web" ? "View Project" : "View Email Template"}
            </motion.a>  
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
