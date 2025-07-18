import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import projects from "../data/projects";

export default function FeaturedWork() {
  const [selectedImage, setSelectedImage] = useState({
    image: null,
    link: null,
    type: null,
  });

  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const isMobile = window.innerWidth < 640;
  const cardsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startX = useRef(null);
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
  };

  const paginatedProjects = projects.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <section className="mt-20 md:px-6 px-1 relative max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8 text-sky-600 dark:text-sky-400">
        Featured Work
      </h2>

      <div className="relative flex justify-between items-center md:gap-4">
        {projects.length > cardsPerPage && (
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="bg-sky-500 text-black w-10 h-10 rounded-full flex items-center justify-center shadow hover:scale-105 transition disabled:opacity-30"
          >
            <img src="./icon/arrow-left.png" alt="Next" className="w-8 h-8" />
          </button>
        )}

        <div
          ref={containerRef}
          className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-2 sm:px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {paginatedProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white dark:bg-gray-800 shadow rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    image: project.image,
                    link: project.link,
                    type: project.type,
                  })
                }
              >
                <div className="aspect-video overflow-hidden">
                  <LazyLoadImage
                    effect="blur"
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base text-sky-600 dark:text-sky-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
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
          </AnimatePresence>
        </div>

        {projects.length > cardsPerPage && (
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="bg-gray-200 rounded-full p-3 text-black w-10 h-10 rounded-full flex items-center justify-center shadow hover:scale-105 transition disabled:opacity-30"
          >
            <img src="./icon/arrow-right.png" alt="Next" className="w-8 h-8" />
          </ button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === index
                  ? "bg-sky-600 scale-110"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      )}

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedImage.image && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedImage({ image: null, link: null, type: null })
            }
          >
          <div className="flex justify-center items-center p-8">
            <motion.img
              src={selectedImage.image}
              alt="Preview"
              loading="lazy"
              className="w-full max-w-4xl max-h-screen h-auto rounded-lg shadow-lg border border-white object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </div>
          {selectedImage.link !== "#" && (
            <motion.a
              href={selectedImage.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-8 right-8 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
              onClick={(e) => e.stopPropagation()}
            >
            {selectedImage.type === "web"
              ? "View Project"
              : "View Email Template"}
            </motion.a>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
