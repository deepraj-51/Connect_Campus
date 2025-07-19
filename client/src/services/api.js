import axios from 'axios';

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_BASE_URL,
=======
  baseURL: 'https//localhost:5000',
>>>>>>> dc299d7173413170acb2a44fdc11d1cba72c16af
});


export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const createPost = (postData) => API.post('/posts', postData);
export const getAllPosts = () => API.get('/posts');
export const getPostById = (postId) => API.get(`/posts/${postId}`);
export const updatePost = (postId, postData) => API.put(`/posts/${postId}`, postData);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId, userId) => API.post(`/posts/${postId}/like`, { userId });
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);
export const getUserPosts = (userId) => {
  return API.get(`/posts/user/${userId}`);
};
