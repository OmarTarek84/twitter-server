const express = require('express');
const { getNotifications, markRead } = require('../controllers/notifications');
const router = express.Router();
const isAuth = require('../middlewares/auth');

router.get('', isAuth, getNotifications);

router.put('/:notificationId/markRead', isAuth, markRead);

module.exports = router;