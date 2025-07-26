import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../store/blogSlice";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Comments from './Comments';

const BlogContent = () => {
  
  const { slug } = useParams();
  const blogs = useSelector(selectAllBlogs);
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <p>Blog not found</p>;

  return (
    <>
    <Helmet>
        <title>{blog.title} | Nitesh Chaughule</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={window.location.origin + blog.image} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <html lang="mr" />
    </Helmet>
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center px-1 mb-2 text-sm text-gray-600 space-x-1 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:underline text-gray-600">Home</Link>
          <span className='text-2xl mb-1.5'>&rsaquo;</span>
          <Link to="/blog" className="hover:underline text-gray-600">Blog</Link>
          <span className='text-2xl mb-1.5'>&rsaquo;</span>
          <span className="text-gray-800 font-medium">{blog.title}</span>
        </div>

        {/* Header */}
        <header className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-8 px-2 text-center rounded-lg shadow">
          <h1 className="text-xl font-bold leading-snug">{blog.title}</h1>
        </header>

        {/* Hero Image */}
        <section className="max-w-md mx-auto mt-6 px-2">
          <img 
            src={blog.thumbnail} 
            alt={blog.title} 
            className="rounded-xl shadow-md mb-6 w-full h-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* Blog Content */}
        <main 
          className="max-w-3xl mx-auto px-4 sm:px-6 mt-10 space-y-10 prose prose-base sm:prose-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></main>

        <div className="md:flex gap-3 mt-10 px-6">
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            Share on WhatsApp
          </a>
          <span className='text-base px-2'>|</span> 
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Share on Facebook
          </a>
          <span className='text-base px-2'>|</span> 
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-500 hover:underline"
          >
            Share on Twitter
          </a>
          <span className='text-base px-2'>|</span> 
          <a 
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Share on LinkedIn
          </a>
        </div>

        <Comments slug={slug} />
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-sky-600 to-blue-600 text-white mt-14 py-6 text-center">
            <p className="text-ms mt-1">Made With ❤️ By Nitesh Chaughule</p>
        </footer>
      </div>
    </div>
    </>
  );
};

export default BlogContent;
