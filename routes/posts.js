const express = require('express');
const { body } = require('express-validator');
const { createPost, getPosts, likePost, retweetPost, addReply, getSinglePost, deletePost } = require('../controllers/posts');
const router = express.Router();
const isAuth = require('../middlewares/auth');

router.post('/create', isAuth, [
    body('content').notEmpty().withMessage('Please provide the content of post')
], createPost);


router.get('', isAuth, getPosts);


router.put('/like/:postId', isAuth, likePost);


router.put('/retweet', isAuth, retweetPost);


router.post('/reply', isAuth, [
    body('replyText').notEmpty().withMessage('Please provide the content of post'),
    body('postId').notEmpty().withMessage('Please provide id of post'),
], addReply);

router.get('/:postId', isAuth, getSinglePost);


router.delete('/:postId', isAuth, deletePost);

module.exports = router;