import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../store/blogSlice";

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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex items-center px-4 mb-2 text-sm text-gray-600 space-x-1 whitespace-nowrap overflow-x-auto">
          <a href="/" className="hover:underline text-gray-600">Home</a>
          <span className='text-2xl mb-1.5'>&rsaquo;</span>
          <a href="#" className="hover:underline text-gray-600">Blog</a>
          <span className='text-2xl mb-1.5'>&rsaquo;</span>
          <span className="text-gray-800 font-medium">{blog.title}</span>
        </div>

        {/* Header */}
        <header className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-8 px-1 text-center">
            <h1 className="text-xl font-bold">{blog.title}</h1>
        </header>

        {/* Hero Image */}
        <section className="max-w-xl mx-auto mt-6 px-4">
            <img src={blog.thumbnail} alt={blog.title} className="rounded-xl shadow-md mb-6 h-100" />
        </section>

        {/* Blog Content */}
        <main className="max-w-4xl mx-auto px-8 mt-10 space-y-10 prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
        ></main>

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
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
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
        <footer className="bg-gradient-to-r from-sky-600 to-blue-600 text-white mt-16 py-6 text-center">
            <p className="text-ms mt-1">Made With ❤️ By Nitesh Chaughule</p>
        </footer>
      </div>
    </div>
  );
};

export default BlogContent;
