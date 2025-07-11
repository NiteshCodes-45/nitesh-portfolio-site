export default function Blogs() {
  const blogPosts = [
    {
      title: "Exploring My Village: Culture, Nature & Stories",
      description:
        "A personal journey through my village — its landscapes, traditions, and what makes it special.",
      slug: "my-village-story.html",
      image: "https://i.ytimg.com/vi/ZlxeX43GQKY/maxresdefault.jpg",
      tags: ["Travel", "Culture", "Personal"],
      date: "July 2025",
    },
    // Add more blog posts here
  ];

  return (
    <div className="px-4 py-8 max-w-8xl mx-auto">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-12 md:mb-15 pt-4 px-4">
        {/* Logo */}
        <a
            href="/nitesh-portfolio-site/"    
            className="flex items-center gap-2"
        >
        <img src="./nc-logo.png" alt="NC Logo" className="h-10 w-auto" />
        </a>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-6">
            <h3 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-300 w-full max-w-2xl">
                Blog Posts  
            </h3>
        </div>
      </div>
      {/* Blog Grid */}
      <div
        className={`grid ${
          blogPosts.length === 1
            ? "grid-cols-1 place-items-center"
            : "grid-cols-1 md:grid-cols-2 gap-8"
        }`}
      >
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group w-full max-w-xl mx-auto"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <p className="text-xs text-gray-400">{post.date}</p>

                <a
                  href={`/nitesh-portfolio-site/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-sky-600 text-white px-3 py-1 rounded-md hover:bg-sky-700 transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
