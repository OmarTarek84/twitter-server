const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const { body } = require('express-validator');
const { createChat, getChatMessages, changeChatName } = require('../controllers/chats');

router.post('/createChat', isAuth, [
    body('users').notEmpty().withMessage('users is required')
], createChat);

router.get('/getMessages', isAuth, getChatMessages);

router.put('/changeChatName', isAuth, [
    body('chatName').notEmpty().withMessage('chat name is required')
], changeChatName);

module.exports = router;