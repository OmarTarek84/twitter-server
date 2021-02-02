const express = require("express");
const { body } = require("express-validator");
const {
  getUserByToken,
  getProfile,
  followUser,
  getFollowDetails,
  getSignedUrl,
  saveProfilePicToDB,
  saveCoverPhotoToDB,
  pinPost,
  searchUser,
} = require("../controllers/users");
const router = express.Router();
const isAuth = require("../middlewares/auth");

router.get("/getUserByToken", isAuth, getUserByToken);

router.get("/profile/:username", isAuth, getProfile);

router.put("/follow/:username", isAuth, followUser);

router.get("/followList/:username", isAuth, getFollowDetails);

router.get("/getSignedUrl", isAuth, getSignedUrl);

router.put(
  "/changeProfilePic",
  isAuth,
  [body("imagePath").notEmpty().withMessage("please provide image path")],
  saveProfilePicToDB
);

router.put(
  "/changeCoverPhoto",
  isAuth,
  [body("imagePath").notEmpty().withMessage("please provide image path")],
  saveCoverPhotoToDB
);

router.put(
  "/pinPost",
  isAuth,
  [body("postId").notEmpty().withMessage("please provide postId")],
  pinPost
);

router.get('/search', isAuth, searchUser);

module.exports = router;
