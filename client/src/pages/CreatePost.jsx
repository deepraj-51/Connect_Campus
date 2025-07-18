import React, { useState } from 'react';
import { createPost } from '../services/api';
import '../style.css';

function CreatePost() {
  const [post, setPost] = useState({ title: '', body: '' });
  const [image, setImage] = useState(null); // New state for image
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("campusconnect-user"));    
    let imageUrl = "";

    // ✅ Upload to Cloudinary
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "campusconnect"); // Your Cloudinary preset
      data.append("cloud_name", "dwiknzmn4"); // Your Cloudinary cloud name

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dwiknzmn4/image/upload", {
          method: "POST",
          body: data,
        });

        const imgData = await res.json();
        console.log("Cloudinary Upload Success:", imgData);        
        imageUrl = imgData.secure_url;
      } catch (err) {
        return alert("Image upload failed ❌", err);
      }
    }

    try {
      await createPost({ ...post, image: imageUrl, author: user.id });
      console.log(post);
      alert("Post created ✅");
      setPost({ title: '', body: '' });
      setImage(null);
      setPreview(null);
    } catch (err) {
      alert("Post creation failed ❌");
    }
  };

  return (
    <div className="page-container">
      <h2>Create a New Post</h2>
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Write something..."
          value={post.body}
          onChange={handleChange}
          required
        />

        {/* Image Upload Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {post.image && (<img src={post.image} alt="post" className="feed-img" />)}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
