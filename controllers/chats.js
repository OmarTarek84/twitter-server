const { validationResult } = require("express-validator");
const Chat = require("../models/chat");
const User = require("../models/user");
const mongoose = require('mongoose');

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
    const allUsersMapped = allUsers.map(u => u._id);
    const isGroupChat = req.query.isGroupChat;
    const newChat = new Chat({
        isGroupChat: isGroupChat || false,
        users: [req.user._id, ...allUsersMapped],
        createdBy: req.user._id
    });
    const chatSaved = await newChat.save();
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
    const populatedChatSaved = await chatSaved.populate(populateQuery).execPopulate();
    res.status(200).json(populatedChatSaved.toJSON());
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            chats: populatedChatSaved._id
        }
    }, {useFindAndModify: false});
    allUsers.forEach(async user => {
        await User.findByIdAndUpdate(user._id, {
            $push: {
                chats: populatedChatSaved._id
            }
        }, {useFindAndModify: false});
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
      return res.status(500).json({ message: "You do not have permission to access this chat or chat has been deleted" });
    }

    const userId = req.user._id;

    const foundChat = await Chat.aggregate([
      {
        $match: {
          users: {$elemMatch: {$eq: mongoose.Types.ObjectId(userId)}},
          _id: mongoose.Types.ObjectId(req.query.chatId)
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $lookup: {
          from: User.collection.name,
          let: {userId: "$users"},
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$userId"]
                }
              }
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                profilePic: 1,
                coverPhoto: 1,
                username: 1,
                _id: 0
              }
            }
          ],
          as: "users"
        }
      },
      {
        $lookup: {
          from: User.collection.name,
          let: {userId: "$createdBy"},
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"]
                }
              }
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                profilePic: 1,
                coverPhoto: 1,
                username: 1,
                _id: 0
              }
            }
          ],
          as: "createdBy"
        }
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    if (!foundChat || !foundChat[0]) {
      return res.status(500).json({ message: "You do not have permission to access this chat or chat has been deleted!" });
    }

    return res.status(200).json(foundChat[0]);

  } catch(err) {
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
      users: {$elemMatch: {$eq: mongoose.Types.ObjectId(userId)}},
      _id: mongoose.Types.ObjectId(req.query.chatId)
    });

    if (!foundChat) {
      return res.status(500).json({ message: "Wrong chat" });
    }

    foundChat.chatName = req.body.chatName;
    await foundChat.save();

    return res.status(200).json({message: 'success'});

  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }

};