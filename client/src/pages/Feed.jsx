import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost, likePost,  } from '../services/api';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import CommentBox from '../pages/CommentBox'



function Feed() {
  const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("campusconnect-user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    //const user = JSON.parse(localStorage.getItem("campusconnect-user"));


  useEffect(() => {
    getAllPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error fetching posts", err));
  }, []);

  const handleLike = async (postId) => {
  try {
    const result = await likePost(postId, user.id);

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              likes: result.liked
                ? [...post.likes, user.id]
                : post.likes.filter(id => id !== user.id)
            }
          : post
      )
    );
  } catch (err) {
    console.error("Like error", err);
  }
};


  const handleDelete = async (postId) => {
    //const confirm = window.confirm("Are you sure?");
    //if (!confirm) return;
    try {
      await deletePost(postId);
      //alert("Deleted ✅");
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // Update comments after adding
  const handleCommentAdded = (postId, updatedComments) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId ? { ...post, comments: updatedComments } : post
      )
    );
  };


  return (
    <div className="page-container">
      <h2>Community Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="feed-container">
          {posts.map(post => {
            const userLiked = post.likes.includes(user.id);
            const isAuthor = post.author._id === user.id;

            return (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                {post.image && <img src={post.image} alt="post" className="feed-img" />}

                <div className="like-section">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="like-btn"
                  >
                    <Heart
                      size={18}
                      fill={userLiked ? 'red' : 'transparent'}
                      stroke={userLiked ? 'red' : 'black'}
                    />
                  </button>
                  <span>{post.likes.length} Likes</span>
                </div>               


                <p><strong>By:</strong> {post.author?.name}</p>

                {/* Show Edit/Delete buttons only if user is author */}
                {isAuthor && (
                  <div className="edit-delete-buttons">
                    <button className='edit-button' onClick={() => navigate(`/edit-post/${post._id}`)}>✏️ Edit</button>
                    <button className='delete-button' onClick={() => handleDelete(post._id)}>🗑️ Delete</button>
                  </div>
                )}
                <CommentBox
                    postId={post._id}
                    comments={post.comments || []}
                    onCommentAdded={handleCommentAdded}
                />
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default Feed;
