import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../store/blogSlice";
import { Link } from "react-router-dom";

export default function Blogs() {
  const blogs = useSelector(selectAllBlogs);
  const [language, setLanguage] = useState('');

  const blogPosts = [
    // Add more blog posts here
    {
      title: "आमचा एक दिवस - प्राचीन लेण्यांच्या कुशीत",
      description:"माझं पाहिलं प्रवास वर्णन एका प्राचीन बौद्ध लेण्यांनबद्दल... निसर्गाच्या सानिध्यात अनुभवलेला एक सुंदर दिवस...",
      //slug: "",
      slug: "first-travel-blog.html",
      image: "./blog/images/bedse_caves_home.jpg",
      tags: ["प्रवासवर्णन", "लेणी"],
      date: "जून २०२५",
    },
  ];

  // {
  //   title: "Exploring My Village: Culture, Nature & Stories",
  //   description:
  //     "A personal journey through my village — its landscapes, traditions, and what makes it special.",
  //   slug: "my-village-story.html",
  //   image: "https://i.ytimg.com/vi/ZlxeX43GQKY/maxresdefault.jpg",
  //   tags: ["Travel", "Culture", "Personal"],
  //   date: "July 2025",
  // },

  return (
    <div className="px-4 py-8 max-w-8xl mx-auto">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-12 md:mb-15 pt-4 px-4">
        {/* Logo */}
        <a
            href="/"    
            className="flex items-center gap-2"
        >
        <img src="./nc-logo.png" alt="NC Logo" className="h-10 w-auto" />
        </a>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-6">
            <h3 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-300 w-full max-w-2xl">
                Blog Post  
            </h3>
        </div>
      </div>
      {/* Blog Grid */}
      <div
        className={`grid ${
          blogs.length == 1
            ? "grid-cols-1 place-items-center"
            : "grid-cols-2 md:grid-cols-2 gap-8"
        }`}
      >
        {blogs.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group w-full max-w-xl mx-auto"
          >
            {/* Image */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-300 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-sky-100 dark:bg-sky-700 dark:text-white text-sky-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-xs text-gray-400">{post.language == "English" ? post.eng_date : post.date }</p>
                {post.slug !== "" ? 
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm bg-sky-600 text-white hover:text-green px-3 py-1 rounded-md hover:bg-sky-700 transition"
                  >
                    { post.language == "English" ? "Read more" : "पुढे वाचा" } →
                  </Link> 
                : <p className="text-xs text-gray-400">{post.language == "English" ? "Wait For Full Blog..." : "पूर्ण ब्लॉगसाठी थोडा वेळ द्या..." }</p> }  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
