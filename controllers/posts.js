const User = require("../models/user");
const Post = require("../models/post");

const { validationResult } = require("express-validator");
const {
  retweetDataPipeline,
  likesPipeline,
  singlePostPipeline,
  postedByPipeline,
  retweetUsersPipeline,
} = require("./pipelines");

exports.createPost = async (req, res, next) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const { content } = req.body;

  const newPost = new Post({
    content: content,
    postedBy: req.user._id,
    retweetData: null,
    replies: [],
  });

  const savedPost = await newPost.save();
  const targetUser = await User.findById(req.user._id);
  targetUser.posts.push(newPost._id);
  await targetUser.save();

  const {
    _id,
    posts,
    password,
    createdAt,
    updatedAt,
    ...detailsOfUser
  } = targetUser.toJSON();

  return res.status(200).json({
    message: "success",
    post: {
      ...savedPost.toJSON(),
      postedBy: detailsOfUser,
    },
  });
};

exports.getPosts = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const pageSize = +req.query.pageSize || 30;
  const currentPage = +req.query.currentPage || 1;

  try {
    const allPost = await Post.aggregate([
      {
        $facet: {
          postData: [
            ...singlePostPipeline,
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: pageSize * currentPage - pageSize,
            },
            {
              $limit: pageSize,
            },
          ],
          pagination: [
            ...singlePostPipeline,
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $count: "totalItemsCount" },
          ],
        },
      },
      {
        $unwind: {
          path: "$pagination",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    const totalItemsCount =
      allPost[0] && allPost[0].pagination
        ? allPost[0].pagination.totalItemsCount
        : 0;
    return res.status(200).json({
      ...allPost[0],
      totalItemsCount: totalItemsCount,
      pageSize: +pageSize,
      currentPage: +currentPage || 1,
      pages: Math.ceil(totalItemsCount / pageSize),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.likePost = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const foundUser = await User.findById(userId);

    const isLiked = foundUser.likes && foundUser.likes.includes(postId);
    const option = isLiked ? "$pull" : "$addToSet";

    await User.findByIdAndUpdate(
      userId,
      { [option]: { likes: postId } },
      { useFindAndModify: false, new: true }
    );

    const populateQuery = [
      { path: "likes", select: "-_id firstName lastName username profilePic" },
      {
        path: "postedBy",
        select: "-_id firstName lastName username profilePic",
      },
    ];

    const afterPostLiked = await Post.findByIdAndUpdate(
      postId,
      { [option]: { likes: userId } },
      { useFindAndModify: false, new: true }
    ).populate(populateQuery);
    return res.status(200).json({
      postId: afterPostLiked._id,
      likes: afterPostLiked.likes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.retweetPost = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  let postId = require("mongoose").Types.ObjectId(req.query.postId);
  let originalPostId;
  const userId = req.user._id;

  if (req.query.originalPostId != "null") {
    originalPostId = require("mongoose").Types.ObjectId(
      req.query.originalPostId
    );
  }

  let foundPost;

  if (originalPostId) {
    foundPost = await Post.findOne({
      retweetData: originalPostId,
      postedBy: userId,
    });
  } else {
    foundPost = await Post.findOne({
      retweetData: postId,
      postedBy: userId,
    });
  }

  if (foundPost && foundPost.replyTo) {
    return res
      .status(500)
      .json({ message: "You can not reply to a replied Post" });
  }

  try {
    const option = !!foundPost ? "$pull" : "$addToSet";

    await Post.updateMany(
      {
        $or: [
          { _id: originalPostId ? originalPostId : postId },
          { retweetData: originalPostId ? originalPostId : postId },
        ],
      },
      { [option]: { retweetUsers: userId } }
    );

    const originalPost = await Post.findById(
      originalPostId ? originalPostId : postId
    );

    if (foundPost) {
      await Post.findOneAndDelete({
        retweetData: originalPostId ? originalPostId : postId,
        postedBy: userId,
      });
      await User.findByIdAndUpdate(
        userId,
        { $pull: { retweets: foundPost._id } },
        { useFindAndModify: false, new: true }
      );
      return res.status(200).json({
        message: "success",
        type: "delete",
        deletedPostId: foundPost._id,
        originalPostId: originalPost._id,
      });
    } else {
      const newPost = new Post({
        retweetData: originalPost._id,
        retweetUsers: [...originalPost.retweetUsers],
        postedBy: userId,
        content: null,
        replies: [],
      });
      const populateQuery = [
        {
          path: "postedBy",
          select: "-_id firstName lastName username profilePic",
        },
        {
          path: "retweetUsers",
          select: "-_id firstName lastName username profilePic",
        },
        {
          path: "retweetData",
          select: "_id content createdAt updatedAt postedBy",
          populate: {
            path: "postedBy",
            select: "-_id firstName lastName username profilePic",
          },
        },
      ];

      const saveNewPost = await newPost.save();
      const populatedSavedNewPost = await saveNewPost
        .populate(populateQuery)
        .execPopulate();
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { retweets: saveNewPost._id } },
        { useFindAndModify: false, new: true }
      );
      return res.status(200).json({
        message: "success",
        type: "add",
        newlyAddedPost: {
          ...populatedSavedNewPost.toJSON(),
        },
        originalPostId: originalPost._id,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Failed" });
  }
};

exports.addReply = async (req, res, next) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const replyText = req.body.replyText;
    const postId = req.body.postId;

    const foundPost = await Post.findById(postId);

    const newReplyPost = new Post({
      replyTo: foundPost.replyTo
        ? foundPost.replyTo
        : require("mongoose").Types.ObjectId(postId),
      postedBy: req.user._id,
      retweetData: null,
      replies: [],
      content: replyText,
    });

    const populateQuery = [
      {
        path: "postedBy",
        select: "-_id firstName lastName username profilePic",
      },
    ];

    const saveNewReplyPost = await newReplyPost.save();
    const populatedsaveNewReplyPost = await saveNewReplyPost
      .populate(populateQuery)
      .execPopulate();

    await Post.findByIdAndUpdate(
      foundPost.replyTo ? foundPost.replyTo : postId,
      {
        $addToSet: {
          replies: saveNewReplyPost._id,
        },
      },
      { useFindAndModify: false }
    );

    const originalPost = await Post.aggregate([
      {
        $match: {
          _id: foundPost.replyTo
            ? foundPost.replyTo
            : require("mongoose").Types.ObjectId(postId),
        },
      },
      { $project: { replies: 0 } },
      ...likesPipeline,
      ...postedByPipeline,
      { ...retweetDataPipeline },
      {
        $unwind: {
          path: "$retweetData",
          preserveNullAndEmptyArrays: true,
        },
      },
      ...retweetUsersPipeline,
      {
        $unwind: {
          path: "$postedBy",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return res.status(200).json({
      ...populatedsaveNewReplyPost.toJSON(),
      replyTo: {
        _id: populatedsaveNewReplyPost._id,
        originalPost: originalPost[0],
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getSinglePost = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const postId = req.params.postId;

    const post = await Post.aggregate([
      { $match: { _id: require("mongoose").Types.ObjectId(postId) } },
      ...singlePostPipeline,
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (!post[0]) {
      return res.status(500).json({ message: "Post Not Found" });
    }

    return res.status(200).json(post[0]);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(500).json({ message: "Post ID is required" });
    }

    const targetPost = await Post.findById(postId);
    if (targetPost.postedBy != req.user._id) {
      return res
        .status(500)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Post.findByIdAndDelete(postId, { useFindAndModify: false });
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        posts: require('mongoose').Types.ObjectId(postId)
      }
    }, {useFindAndModify: false});
    const allPostsWithRetweetData = await Post.find({ retweetData: require('mongoose').Types.ObjectId(postId) });
    await Post.deleteMany({
      retweetData: require('mongoose').Types.ObjectId(postId)
    });
    res.status(200).json({ message: "success", deletedPostId: targetPost._id });
    if (targetPost.replies && targetPost.replies.length > 0) {
      const repliesPosts = await Post.find({
        _id: { $in: targetPost.replies },
      });
      repliesPosts.forEach(async (repPost) => {
        if (repPost.likes.length > 0) {
          const allUsersLikedRepliedPost = await User.find({
            _id: { $in: repPost.likes },
          });
          allUsersLikedRepliedPost.forEach(async (user) => {
            user.likes.pull(repPost._id);
            await user.save();
          });
        }
        await Post.deleteOne({ _id: repPost._id });
      });
    }

    if (targetPost.replyTo) {
      await Post.findByIdAndUpdate(
        targetPost.replyTo,
        {
          $pull: {
            replies: targetPost._id,
          },
        },
        { useFindAndModify: false }
      );
    }

    if (targetPost.likes && targetPost.likes.length > 0) {
      const allUsersLikedThisPost = await User.find({
        _id: { $in: targetPost.likes },
      });
      allUsersLikedThisPost.forEach(async (user) => {
        user.likes.pull(targetPost._id);
        await user.save();
      });
    }

    if (targetPost.retweetData) {
      await Post.findByIdAndUpdate(
        targetPost.retweetData,
        {
          $pull: {
            retweetUsers: req.user._id,
          },
        },
        { useFindAndModify: false }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            retweets: require('mongoose').Types.ObjectId(postId),
          },
        },
        { useFindAndModify: false }
      );
    }

    if (allPostsWithRetweetData.length > 0) {
      allPostsWithRetweetData.forEach(async (targetPostWithRetweet) => {
        await User.findByIdAndUpdate(
          targetPostWithRetweet.postedBy,
          {
            $pull: {
              retweets: targetPostWithRetweet._id,
            },
          },
          { useFindAndModify: false }
        );
        if (
          targetPostWithRetweet.replies &&
          targetPostWithRetweet.replies.length > 0
        ) {
          const repliesPosts = await Post.find({
            _id: { $in: targetPostWithRetweet.replies },
          });
          repliesPosts.forEach(async (repPost) => {
            if (repPost.likes.length > 0) {
              const allUsersLikedRepliedPost = await User.find({
                _id: { $in: repPost.likes },
              });
              allUsersLikedRepliedPost.forEach(async (user) => {
                user.likes.pull(repPost._id);
                await user.save();
              });
            }
          });
        }

        if (targetPostWithRetweet.replyTo) {
          await Post.findByIdAndUpdate(
            targetPostWithRetweet.replyTo,
            {
              $pull: {
                replies: targetPostWithRetweet._id,
              },
            },
            { useFindAndModify: false }
          );
        }

        if (
          targetPostWithRetweet.likes &&
          targetPostWithRetweet.likes.length > 0
        ) {
          const allUsersLikedThisPost = await User.find({
            _id: { $in: targetPostWithRetweet.likes },
          });
          allUsersLikedThisPost.forEach(async (user) => {
            user.likes.pull(targetPostWithRetweet._id);
            await user.save();
          });
        }
        await Post.findByIdAndDelete(targetPostWithRetweet._id, { useFindAndModify: false });
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
