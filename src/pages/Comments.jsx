import React, { useState, useEffect, useActionState, useRef } from 'react';
import { db } from "../firebaseConfig";
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

import ReCAPTCHA from "react-google-recaptcha";

const Comments = ({ slug }) => {
    const captchaRef = useRef();
    const [comment, setComment] = useState('');
    const [yourName, setYourName] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [captchaToken, setCaptchaToken] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'blogs', slug, 'comments'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCommentsList(comments);
        });
        return () => unsubscribe();
    }, [slug]);

    const commentFormSubmit = async (prevFormState, formData) => {
        // Validate form data
        const name = formData.get('name');
        const comment = formData.get('comment');

        const errors = [];

        if (!name || name.trim() === '') {
            errors.push('Name is required.');
        }
        if (!comment || comment.trim() === '') {
            errors.push('Comment cannot be empty.');
        }
        if (!captchaToken) {
            errors.push('Please complete the CAPTCHA.');
        }

        if (errors.length > 0) {
            return { errors, enteredValues: { name, comment } };
        }

        // Simulate successful submission
        console.log("Comment submitted:", { name, comment });   
        // Add comment to Firestore
        if (slug) {
            await addDoc(collection(db, 'blogs', slug, 'comments'), {
                name,
                comment,
                timestamp: serverTimestamp()
            });
        }

        // Reset form fields
        captchaRef.current.reset();
        setCaptchaToken(null);
        setComment("");
        setYourName("");
        
        return { errors: null };

    }

    const [formState, commentFormAction] = useActionState(commentFormSubmit, {
        errors: null,
        enteredValues: { name: '', comment: '' },
    });

    return (
        <>
            {/* Comment Section */}
            <section className="mt-12 px-8">
            <h2 className="text-left text-xl font-semibold mb-4">Leave a Comment</h2>
            <div className="bg-white rounded-lg shadow p-4 text-left">
                <form action={commentFormAction} className="space-y-4">
                    <input 
                    name='name' 
                    type='text' 
                    placeholder="Your name"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2' 
                    defaultValue={formState.enteredValues?.name}
                    />
                    <textarea
                    name='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                    rows={4}
                    defaultValue={formState.enteredValues?.comment}
                    />

                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey="6Lc5eo8rAAAAAAywugQ4vL9ZNeHCuPkKKCfaI9It"
                        onChange={(token) => setCaptchaToken(token)}
                    />

                    {formState.errors && (
                        <ul className="text-red-600 list-disc pl-5 mt-2 space-y-1 text-sm border border-red-200 bg-red-50 p-3 rounded">
                        {formState.errors.map((error, index) => (
                            <li className='ml-4' key={index}>{error}</li>
                        ))}
                        </ul>
                    )}

                    <button
                        className="mt-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-md hover:brightness-110 transition px-4 py-2"
                    >
                    Post Comment
                    </button>
                </form>
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
                    <p className="text-gray-500">Comment By {cmt.name} on {new Date(cmt.timestamp?.seconds * 1000).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                        timeZone: "Asia/Kolkata"
                    })}</p>
                    <p className="text-gray-800">{cmt.comment}</p>
                    </div>
                ))
                )}
            </div>
            </section>
        </>
    );
}

export default Comments;