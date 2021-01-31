const User = require("../models/user");
const Post = require("../models/post");

const postsPipeline = [
  {
    $project: {
      content: 1,
      createdAt: 1,
      updatedAt: 1,
      postedBy: 1,
      retweetUsers: 1,
      likes: 1,
      _id: 1,
      replyTo: 1,
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
            email: 1,
            profilePic: 1,
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
            email: 1,
            profilePic: 1,
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
            email: 1,
            username: 1,
            profilePic: 1,
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
];

const retweetDataPipeline = {
  $lookup: {
    from: Post.collection.name,
    let: { postId: "$retweetData" },
    pipeline: [
      { $match: { $expr: { $eq: ["$_id", "$$postId"] } } },
      {
        $project: {
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          postedBy: 1,
          _id: 1,
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
                email: 1,
                profilePic: 1,
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
    ],
    as: "retweetData",
  },
};

const replyToPipeline = {
  $lookup: {
    from: Post.collection.name,
    let: {
      postId: "$replyTo",
    },
    pipeline: [
      {
        $project: {
          _id: 1,
        },
      },
      {
        $match: { $expr: { $eq: ["$_id", "$$postId"] } },
      },
      {
        $lookup: {
          from: Post.collection.name,
          let: { postId: "$_id" },
          // _id of foreign field User
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$postId"] } } },
            {
              $project: {
                _id: 1,
                postedBy: 1,
                likes: 1,
                createdAt: 1,
                content: 1,
              },
            },
            {
              $lookup: {
                from: User.collection.name,
                let: { userId: "$postedBy" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
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
              $lookup: {
                from: User.collection.name,
                let: { userId: "$likes" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$userId"] } } },
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
                as: "likes",
              },
            },
          ],
          as: "originalPost",
        },
      },
      {
        $unwind: {
          path: "$originalPost",
          preserveNullAndEmptyArrays: true,
        },
      },
    ],
    as: "replyTo",
  },
};

const followPipeline = [
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
            _id: 0
          }
        }
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
            _id: 0
          }
        }
      ],
      as: "following",
    },
  },
];

exports.getUserByToken = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const foundUser = await User.aggregate([
    { $match: { _id: require('mongoose').Types.ObjectId(req.user._id) } },
    {
      $project: {
        _id: 0,
        posts: 0,
        password: 0,
        likes: 0,
        retweets: 0,
        createdAt: 0,
        updatedAt: 0
      },
    },
    ...followPipeline
  ]);

  if (!foundUser[0]) {
    return res.status(403).json({message: 'Unauthorized'});
  }

  return res.status(200).json(foundUser[0]);
};

exports.getProfile = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const username = req.params.username;
  const foundUserByUsername = await User.findOne({username: username});

  const replies = await Post.aggregate([
    {
      $match: {
        postedBy: require('mongoose').Types.ObjectId(foundUserByUsername._id),
        replyTo: { $ne: null },
      },
    },
    ...postsPipeline,
    {
      ...replyToPipeline,
    },
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
    {
      $lookup: {
        from: Post.collection.name,
        let: { postId: "$likes" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$postId"],
              },
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
        ],
        as: "likes",
      },
    },
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
    ...followPipeline
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
  const foundUserByUsername = await User.findOne({username: username});

  if (!foundUserByUsername) {
    return res.status(500).json({message: 'User Not Found'});
  }

  const foundUser = await User.aggregate([
    { $match: { _id: require('mongoose').Types.ObjectId(foundUserByUsername._id) } },
    {
      $project: {
        _id: 0,
        following: 1,
        followers: 1
      },
    },
    ...followPipeline
  ]);

  if (!foundUser[0]) {
    return res.status(403).json({message: 'Unauthorized'});
  }

  return res.status(200).json({
    ...foundUser[0],
    username: foundUserByUsername.username,
    firstName: foundUserByUsername.firstName,
    lastName: foundUserByUsername.lastName
  });
};