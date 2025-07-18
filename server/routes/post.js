const express = require('express');
const router = express.Router();
const { createPost, getAllPosts,updatePost, deletePost, likePost, addComment, getUserPosts} = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getAllPosts);
// router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost); // Like a post
router.post('/:id/comments', addComment);
router.get('/user/:id', getUserPosts);

module.exports = router;
