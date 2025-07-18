import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/api';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', body: '', image: '' });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    getPostById(id)
      .then(res => {
         const { title, body, image } = res.data;
         setPost({ title, body, image });
      })
      .catch(err => console.error("Error loading post", err));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updateImage = post.image;

    if (newImage) {
      const data = new FormData();
      data.append("file", newImage);
      data.append("upload_preset", "campusconnect");

        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dwiknzmn4/image/upload", {
            method: "POST",
            body: data,
          });

          const imgData = await res.json();
          updateImage = imgData.secure_url;
        } catch (err) {
          return alert("Image upload failed ❌", err);
        }
    }

    try {
      await updatePost(id, { ...post, image: updateImage });
      alert("Post updated ✅");
      navigate('/feed');
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="page-container">
      <h2>Edit Post</h2>
      <form className="form-box" onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          required
        />

        {post.image && !preview && (
          <img src={post.image} alt="current" className="preview-img" />
        )}

        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />
        
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;
