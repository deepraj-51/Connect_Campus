import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../services/api';
import '../style.css';

function Profile() {
  const storedUser = localStorage.getItem("campusconnect-user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [posts, setPosts] = useState([]);
<<<<<<< HEAD
=======
  const storedUser = localStorage.getItem("campusconnect-user");
  const user = storedUser ? JSON.parse(storedUser) : null;
>>>>>>> f4f97442ee36dcba6e65fdf529fb7d22922c58ad

  useEffect(() => {
    if (user?.id) {
      getUserPosts(user.id)
        .then(res => setPosts(res.data))
        .catch(err => console.error("Failed to fetch user's posts", err));
    }
  }, [user?.id]);

  if (!user) {
    return <p>User not logged in. Please log in to view your profile.</p>;
  }

  return (
    <div className="page-container">
      <h2>👤 {user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>📌 Your Posts</h3>
      <div className="feed-container">
        {posts.length === 0 ? <p>You haven't posted anything yet.</p> :
          posts.map(post => (
            <div className="post-card" key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              {post.image && <img src={post.image} alt="post" className="feed-img" />}
              <p><strong>Likes:</strong> {post.likes.length}</p>
              <p><strong>Comments:</strong> {post.comments.length}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Profile;
