import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../store/blogSlice";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BlogContent = () => {
  const [comment, setComment] = useState('');
  const [yourName, setYourName] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const { slug } = useParams();
  const blogs = useSelector(selectAllBlogs);
  const blog = blogs.find((b) => b.slug === slug);

  const handleAddComment = () => {
    if (comment.trim() && yourName.trim()) {
      const newComment = {
        yourName,
        comment,
        date: new Date().toLocaleString(),
      };

      setCommentsList([...commentsList, newComment]);
      setComment('');
      setYourName('');
    }
    console.log(commentsList);
  };

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


        {/* Comment Section */}
        <section className="mt-12 px-8" hidden>
          <h2 className="text-left text-xl font-semibold mb-4">Leave a Comment</h2>
          <div className="bg-white rounded-lg shadow p-4 text-left">
            <input 
              name='name' 
              type='text' 
              placeholder="Your name"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2' 
              required
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            />
            <button
              onClick={handleAddComment}
              className="mt-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-md hover:brightness-110 transition px-4 py-2"
            >
              Post Comment
            </button>
          </div>

          {/* Comment List */}
          <div className="mt-6 space-y-4 text-left">
            {commentsList.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first!</p>
            ) : (
              commentsList.map((cmt, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="text-gray-500">Comment By {cmt.yourName} on {cmt.date}</p>
                  <p className="text-gray-800">{cmt.comment}</p>
                </div>
              ))
            )}
          </div>
        </section>

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
