import React, { useState } from 'react';
import { addComment } from '../services/api';

function CommentBox({ postId, comments = [], onCommentAdded }) {
  const [commentText, setCommentText] = useState('');
  const user = JSON.parse(localStorage.getItem("campusconnect-user"));

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updatedComments = await addComment(postId, {
        text: commentText,
        userId: user.id,
      });

      onCommentAdded(postId, updatedComments);
      setCommentText('');
    } catch (err) {
      console.error("❌ Failed to add comment", err);
    }
  };

  return (
    <div className="comment-box">
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="comments-section">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            <strong>{c.author?.name || "Anonymous"}</strong>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentBox;
