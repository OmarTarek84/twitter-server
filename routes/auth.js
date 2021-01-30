const express = require('express');
const { signup, signin } = require('../controllers/auth');
const router = express.Router();

const {body} = require('express-validator');

router.post('/signup', [
    body('firstName').notEmpty().withMessage('First Name is Required'),
    body('lastName').notEmpty().withMessage('last Name is Required'),
    body('userName').notEmpty().withMessage('Username is Required'),
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Not valid Email'),
    body('password').notEmpty().withMessage('password is Required'),
], signup);



router.post('/login', [
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Not valid Email'),
    body('password').notEmpty().withMessage('password is Required'),
], signin);

module.exports = router;