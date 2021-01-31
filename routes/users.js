const express = require('express');
const { getUserByToken, getProfile, followUser, getFollowDetails } = require('../controllers/users');
const router = express.Router();
const isAuth = require('../middlewares/auth');

router.get('/getUserByToken', isAuth, getUserByToken);

router.get('/profile/:username', isAuth, getProfile);

router.put('/follow/:username', isAuth, followUser);

router.get('/followList/:username', isAuth, getFollowDetails);

module.exports = router;