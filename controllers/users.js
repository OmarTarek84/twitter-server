const User = require("../models/user");
const Post = require("../models/post");
const AWS = require("aws-sdk");
const { validationResult } = require("express-validator");
const {
  userDetailsPipeline,
  replyToPipeline,
  postsPipeline,
  retweetDataPipeline,
  followPipeline,
  likesPipeline,
  singlePostPipeline,
} = require("./pipelines");

const s3 = new AWS.S3({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-2",
});

exports.getUserByToken = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const foundUser = await User.aggregate([
      { $match: { _id: require("mongoose").Types.ObjectId(req.user._id) } },
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
      ...userDetailsPipeline,
    ]);

    if (!foundUser[0]) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return res.status(200).json(foundUser[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const username = req.params.username;
  const foundUserByUsername = await User.findOne({ username: username });

  const replies = await Post.aggregate([
    {
      $match: {
        postedBy: require("mongoose").Types.ObjectId(foundUserByUsername._id),
        replyTo: { $ne: null },
      },
    },
    ...postsPipeline,
    ...replyToPipeline,
    {
      $unwind: {
        path: "$replyTo",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const foundUser = await User.aggregate([
    { $match: { username: username } },
    {
      $project: {
        password: 0,
        _id: 0,
      },
    },
    ...likesPipeline,
    {
      $lookup: {
        from: Post.collection.name,
        let: { postId: "$posts" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$postId"],
              },
            },
          },
          ...postsPipeline,
        ],
        as: "posts",
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
              let: { userId: "$likes" },
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
                    coverPhoto: 1,
                    profilePic: 1,
                    email: 1,
                    _id: 0,
                  },
                },
              ],
              as: "likes",
            },
          },
          {
            $lookup: {
              from: User.collection.name,
              let: { userId: "$retweetUsers" },
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
                    coverPhoto: 1,
                    profilePic: 1,
                    email: 1,
                    _id: 0,
                  },
                },
              ],
              as: "retweetUsers",
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
                    coverPhoto: 1,
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
          { ...retweetDataPipeline },
          {
            $unwind: {
              path: "$retweetData",
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
              retweetUsers: 1,
              retweetData: 1,
              likes: 1,
            },
          },
        ],
        as: "retweets",
      },
    },
    ...followPipeline,
  ]);

  if (!foundUser[0]) {
    return res.status(500).json({ message: "user not found" });
  }

  return res.status(200).json({
    ...foundUser[0],
    replies: replies,
  });
};

exports.followUser = async (req, res, next) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const foundOtherUser = await User.findOne({
      username: req.params.username,
    });
    if (!foundOtherUser) {
      return res.status(500).json({ message: "Wrong username" });
    }

    const myUserId = req.user._id;
    const otherUserId = foundOtherUser._id;

    const foundMyUser = await User.findById(myUserId);

    const isFollowing =
      foundMyUser.following && foundMyUser.following.includes(otherUserId);
    const option = isFollowing ? "$pull" : "$addToSet";

    await User.findByIdAndUpdate(
      myUserId,
      {
        [option]: {
          following: otherUserId,
        },
      },
      { useFindAndModify: false }
    );

    const afterAddFollowing = await User.findByIdAndUpdate(
      otherUserId,
      {
        [option]: {
          followers: myUserId,
        },
      },
      { useFindAndModify: false, new: true }
    ).select("-_id firstName lastName username profilePic email");

    return res.status(200).json({
      message: "success",
      newfollowingUser: afterAddFollowing,
      type: option === "$pull" ? "Delete" : "Add",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getFollowDetails = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const username = req.params.username;
  const foundUserByUsername = await User.findOne({ username: username });

  if (!foundUserByUsername) {
    return res.status(500).json({ message: "User Not Found" });
  }

  const foundUser = await User.aggregate([
    {
      $match: {
        _id: require("mongoose").Types.ObjectId(foundUserByUsername._id),
      },
    },
    {
      $project: {
        _id: 0,
        following: 1,
        followers: 1,
      },
    },
    ...followPipeline,
  ]);

  if (!foundUser[0]) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  return res.status(200).json({
    ...foundUser[0],
    username: foundUserByUsername.username,
    firstName: foundUserByUsername.firstName,
    lastName: foundUserByUsername.lastName,
  });
};

exports.getSignedUrl = (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const photoType = req.query.photoType || "profilePic";

  try {
    const key = `${req.user.userName}/${photoType}.png`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: process.env.BUCKET_NAME,
        ContentType: "image/png",
        Key: key,
      },
      (err, url) =>
        res.json({
          url: url,
          imagePath: process.env.BEGINNING_BUCKETNAME_URL + key,
        })
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.saveProfilePicToDB = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const imagePath = req.body.imagePath;
    await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: imagePath,
      },
      { useFindAndModify: false }
    );
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.saveCoverPhotoToDB = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const imagePath = req.body.imagePath;
    await User.findByIdAndUpdate(
      req.user._id,
      {
        coverPhoto: imagePath,
      },
      { useFindAndModify: false }
    );
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.pinPost = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const postId = require("mongoose").Types.ObjectId(req.body.postId);
    const foundUser = await User.findById(req.user._id);
    const foundUserPinnedPost = foundUser.pinnedPost ? foundUser.pinnedPost.toString(): null;

    const option = postId.toString() === foundUserPinnedPost ? 'delete': 'add';

    await User.findByIdAndUpdate(
      req.user._id,
      {
          pinnedPost: option === 'delete' ? null: postId,
      },
      { useFindAndModify: false }
    );

    if (option === 'add') {
      const postDet = await Post.aggregate([
        { $match: { _id: postId } },
        ...singlePostPipeline,
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
  
      if (!postDet[0]) {
        return res.status(500).json({ message: "No Post Found" });
      }
      return res.status(200).json({ message: "Success", pinnedPost: postDet[0], type: 'add' });
    } else {
      return res.status(200).json({ message: "Success", pinnedPostId: postId, type: 'delete' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.searchUser = async (req, res, next) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const pageSize = +req.query.pageSize || 30;
  const currentPage = +req.query.currentPage || 1;

  const search = req.query.search;

  const foundUsers = await User.aggregate([
    {
      $project: {
        firstName: 1,
        lastName: 1,
        coverPhoto: 1,
        username: 1,
        email: 1,
        profilePic: 1,
        _id: 0,
      }
    },
    {
      $facet: {
        userDetails: [
          {
            $match: {
              $or: [
                {firstName: {$regex: search, $options: "i"}},
                {lastName: {$regex: search, $options: "i"}},
                {userName: {$regex: search, $options: "i"}}
              ]
            }
          },
          {
            $skip: pageSize * currentPage - pageSize,
          },
          {
            $limit: pageSize,
          },
        ],
        pagination: [
          {
            $match: {
              $or: [
                {firstName: {$regex: search, $options: "i"}},
                {lastName: {$regex: search, $options: "i"}},
                {userName: {$regex: search, $options: "i"}}
              ]
            }
          },
          { $count: "totalItemsCount" }
        ]
      }
    },
    {
      $unwind: {
        path: "$pagination",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const totalItemsCount =
      foundUsers[0] && foundUsers[0].pagination
        ? foundUsers[0].pagination.totalItemsCount
        : 0;

  return res.status(200).json({
    ...foundUsers[0],
    totalItemsCount: totalItemsCount,
    pageSize: +pageSize,
    currentPage: +currentPage || 1,
    pages: Math.ceil(totalItemsCount / pageSize),
  });
};