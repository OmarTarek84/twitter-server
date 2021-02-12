const { validationResult } = require("express-validator");
const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const { senderPipeline, readByPipeline } = require("./pipelines");

exports.createChat = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {

    const allUsers = await User.find(
      { username: { $in: req.body.users } },
      { _id: 1 }
    );

    const foundExistChatBetweenTwo = await Chat.findOne({
      users: {
        $all: [mongoose.Types.ObjectId(req.user._id), mongoose.Types.ObjectId(allUsers[0]._id)],
        $size: 2
      },
    });

    const populateQuery = [
      {
        path: "users",
        select: "-_id firstName lastName username profilePic coverPhoto",
      },
      {
        path: "createdBy",
        select: "-_id firstName lastName username profilePic coverPhoto",
      },
    ];

    if (foundExistChatBetweenTwo) {
      const popound = await foundExistChatBetweenTwo.populate(populateQuery).execPopulate();
      return res.status(200).json(popound);
    }

    const allUsersMapped = allUsers.map((u) => u._id);
    const isGroupChat = req.query.isGroupChat;
    const newChat = new Chat({
      isGroupChat: isGroupChat || false,
      users: [req.user._id, ...allUsersMapped],
      createdBy: req.user._id,
      latestMessage: null
    });
    const chatSaved = await newChat.save();
    const populatedChatSaved = await chatSaved
      .populate(populateQuery)
      .execPopulate();
    res.status(200).json(populatedChatSaved.toJSON());
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          chats: populatedChatSaved._id,
        },
      },
      { useFindAndModify: false }
    );
    allUsers.forEach(async (user) => {
      await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            chats: populatedChatSaved._id,
          },
        },
        { useFindAndModify: false }
      );
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getChatMessages = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    if (!req.query.chatId || !mongoose.isValidObjectId(req.query.chatId)) {
      return res
        .status(500)
        .json({
          message:
            "You do not have permission to access this chat or chat has been deleted",
        });
    }

    const pageSize = +req.query.pageSize || 30;
    const currentPage = +req.query.currentPage || 1;

    const userId = req.user._id;

    const foundChat = await Chat.aggregate([
      {
        $match: {
          users: { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) } },
          _id: mongoose.Types.ObjectId(req.query.chatId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          let: { userId: "$users" },
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
                profilePic: 1,
                coverPhoto: 1,
                username: 1,
                _id: 0,
              },
            },
          ],
          as: "users",
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          let: { userId: "$createdBy" },
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
                profilePic: 1,
                coverPhoto: 1,
                username: 1,
                _id: 0,
              },
            },
          ],
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    if (!foundChat || !foundChat[0]) {
      return res
        .status(500)
        .json({
          message:
            "You do not have permission to access this chat or chat has been deleted!",
        });
    }

    const allMessages = await Message.aggregate([
      { $match: { chat: mongoose.Types.ObjectId(req.query.chatId) } },
      {
        $facet: {
          messages: [
            ...senderPipeline,
            ...readByPipeline,
            {
              $sort: {
                createdAt: -1
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
            ...senderPipeline,
            ...readByPipeline,
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $count: "totalItemsCount" },
          ]
        }
      },
      {
        $unwind: {
          path: "$pagination",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    const totalItemsCount =
      allMessages[0] && allMessages[0].pagination
        ? allMessages[0].pagination.totalItemsCount
        : 0;

    return res.status(200).json({
      chat: foundChat[0],
      messages: allMessages[0].messages,
      messagesCount: totalItemsCount,
      pageSize: +pageSize,
      currentPage: +currentPage || 1,
      pages: Math.ceil(totalItemsCount / pageSize),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.changeChatName = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    if (!req.query.chatId || !mongoose.isValidObjectId(req.query.chatId)) {
      return res.status(500).json({ message: "Wrong chat Id" });
    }

    const userId = req.user._id;

    const foundChat = await Chat.findOne({
      users: { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) } },
      _id: mongoose.Types.ObjectId(req.query.chatId),
    });

    if (!foundChat) {
      return res.status(500).json({ message: "Wrong chat" });
    }

    foundChat.chatName = req.body.chatName;
    await foundChat.save();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    if (!req.query.chatId || !mongoose.isValidObjectId(req.query.chatId)) {
      return res.status(500).json({ message: "Wrong chat Id" });
    }

    const newMessage = new Message({
      content: req.body.content,
      readBy: [],
      sender: req.user._id,
      chat: req.query.chatId,
    });

    const populateQuery = [
      {
        path: "sender",
        select: "-_id firstName lastName username profilePic coverPhoto",
      },
    ];

    const saveNewMessage = await newMessage.save();
    const populatedsaveNewMessage = await saveNewMessage
      .populate(populateQuery)
      .execPopulate();

      res.status(200).json(populatedsaveNewMessage.toJSON());
      
      const targetedChat = await Chat.findByIdAndUpdate(req.query.chatId, {
        latestMessage: mongoose.Types.ObjectId(saveNewMessage._id)
      }, {useFindAndModify: false});

      insertNotificationFunc(req.user._id, targetedChat);

  } catch (err) {
    return res.status(403).json({ message: "Not Authorized" });
  }
};


function insertNotificationFunc(userFrom, chat) {
  chat.users.forEach(async userId => {
    if (userId.toString() === userFrom.toString()) return;
    await Notification.insertNotification(userId, userFrom, 'newMessage', null, null, chat._id);
  });
}