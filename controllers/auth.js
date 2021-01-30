const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      userName,
    } = req.body;
    const foundUser = await User.findOne({
      $or: [{ email: email }, { username: userName }],
    });
    if (foundUser) {
      return res.status(500).json({ message: "User Already Exists" });
    }

    var fullUrl = req.protocol + "://" + req.get("host");

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      password: await bcrypt.hash(password, 12),
      username: userName,
      email: email,
      profilePic: fullUrl + "/images/profilePic.jpeg",
      retweets: [],
      followers: [],
      following: [],
    });
    await newUser.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.signin = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(500).json({ message: "EMail or Password is incorrect" });
  }

  const passwordHashedTrue = await bcrypt.compare(password, foundUser.password);
  if (!passwordHashedTrue) {
    return res.status(500).json({ message: "EMail or Password is incorrect" });
  }

  const payload = {
    _id: foundUser._id,
    email: foundUser.email,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    userName: foundUser.username,
    profilePic: foundUser.profilePic,
    retweets: foundUser.retweets,
  };

  const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const foundUserAgg = await User.aggregate([
    { $match: { _id: require("mongoose").Types.ObjectId(foundUser._id) } },
    {
      $project: {
        _id: 0,
        posts: 0,
        password: 0,
        likes: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        let: { userId: "$followers" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              profilePic: 1,
              email: 1,
              _id: 0,
            },
          },
        ],
        as: "followers",
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        let: { userId: "$following" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              profilePic: 1,
              email: 1,
              _id: 0,
            },
          },
        ],
        as: "following",
      },
    },
    {
      $lookup: {
        from: Post.collection.name,
        let: { postId: "$retweets" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$postId"],
              },
            },
          },
          {
            $lookup: {
              from: User.collection.name,
              let: { userId: "$postedBy" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$userId"],
                    },
                  },
                },
                {
                  $project: {
                    firstName: 1,
                    lastName: 1,
                    username: 1,
                    profilePic: 1,
                    email: 1,
                    _id: 0,
                  },
                },
              ],
              as: "postedBy",
            },
          },
          {
            $unwind: {
              path: "$postedBy",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              content: 1,
              createdAt: 1,
              updatedAt: 1,
              postedBy: 1,
              _id: 1,
            },
          },
        ],
        as: "retweets",
      },
    },
  ]);
  return res.status(200).json({
    message: "success",
    accessToken: accessToken,
    userDetails: foundUserAgg[0],
  });
};
