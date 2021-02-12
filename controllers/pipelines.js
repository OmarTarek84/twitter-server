const User = require("../models/user");
const Post = require("../models/post");
const Chat = require("../models/chat");
const Message = require("../models/message");

const likesPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$likes" },
      // _id of foreign field User
      pipeline: [
        { $match: { $expr: { $in: ["$_id", "$$userId"] } } },
        {
          $project: {
            firstName: 1,
            coverPhoto: 1,
            lastName: 1,
            username: 1,
            profilePic: 1,
            _id: 0,
          },
        },
      ],
      as: "likes",
    },
  },
];

const postedByPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$postedBy" },
      // _id of foreign field User
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            username: 1,
            coverPhoto: 1,
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

const chatCreatedByPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$createdBy" },
      // _id of foreign field User
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            username: 1,
            coverPhoto: 1,
            profilePic: 1,
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
      ...postedByPipeline,
    ],
    as: "retweetData",
  },
};

const replyToPipeline = [
  {
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
              ...postedByPipeline,
              ...likesPipeline,
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
  },
  {
    $unwind: {
      path: "$replyTo",
      preserveNullAndEmptyArrays: true,
    },
  },
];

const retweetUsersPipeline = [
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
            coverPhoto: 1,
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
];

const retweetsPipeline = [
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
        ...likesPipeline,
        ...retweetUsersPipeline,
        ...postedByPipeline,
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
];

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
  ...likesPipeline,
  ...retweetUsersPipeline,
  ...postedByPipeline,
];

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
            coverPhoto: 1,
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
            coverPhoto: 1,
            profilePic: 1,
            email: 1,
            _id: 0,
          },
        },
      ],
      as: "following",
    },
  },
];

const repliesPipeline = {
  $lookup: {
    from: Post.collection.name,
    let: {
      postId: "$replies",
    },
    pipeline: [
      {
        $project: {
          _id: 1,
          postedBy: 1,
          likes: 1,
          createdAt: 1,
          content: 1,
          replyTo: 1,
        },
      },
      {
        $match: { $expr: { $in: ["$_id", "$$postId"] } },
      },
      ...likesPipeline,
      ...postedByPipeline,
      ...replyToPipeline,
    ],
    as: "replies",
  },
};

const singlePostPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      localField: "likes",
      foreignField: "_id",
      as: "likes",
    },
  },
  {
    $lookup: {
      from: User.collection.name,
      localField: "postedBy",
      foreignField: "_id",
      as: "postedBy",
    },
  },
  {
    $unwind: {
      path: "$postedBy",
      preserveNullAndEmptyArrays: true
    },
  },
  {
    $lookup: {
      from: User.collection.name,
      localField: "retweetUsers",
      foreignField: "_id",
      as: "retweetUsers",
    },
  },
  ...replyToPipeline,
  // retweetdata
  { ...retweetDataPipeline },
  {
    $unwind: {
      path: "$retweetData",
      preserveNullAndEmptyArrays: true,
    },
  },
  // replies
  { ...repliesPipeline },
  {
    $project: {
      "likes.firstName": 1,
      "likes.lastName": 1,
      "likes.profilePic": 1,
      "likes.username": 1,
      "likes.coverPhoto": 1,

      "postedBy.firstName": 1,
      "postedBy.lastName": 1,
      "postedBy.profilePic": 1,
      "postedBy.username": 1,
      "postedBy.coverPhoto": 1,

      "retweetUsers.firstName": 1,
      "retweetUsers.lastName": 1,
      "retweetUsers.profilePic": 1,
      "retweetUsers.username": 1,
      "retweetUsers.coverPhoto": 1,

      "retweetData.content": 1,
      "retweetData.createdAt": 1,
      "retweetData.updatedAt": 1,
      "retweetData._id": 1,
      "retweetData.postedBy": 1,

      content: 1,
      createdAt: 1,
      updatedAt: 1,
      replyTo: 1,
      replies: 1,
    },
  },
];

const senderPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$sender" },
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
            _id: 0,
            firstName: 1,
            lastName: 1,
            username: 1,
            profilePic: 1,
          }
        }
      ],
      as: "sender"
    }
  },
  {
    $unwind: {
      path: "$sender",
      preserveNullAndEmptyArrays: true
    }
  },
];

const chatPipeline = [
  {
    $lookup: {
      from: Chat.collection.name,
      let: {chatId: "$chats"},
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$_id", "$$chatId"]
            }
          }
        },
        ...chatCreatedByPipeline,
        {
          $lookup: {
            from: Message.collection.name,
            let: {msgId: "$latestMessage"},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$msgId"]
                  }
                }
              },
              {
                $project: {
                  content: 1,
                  sender: 1,
                  _id: 1
                }
              },
              {
                $lookup: {
                  from: User.collection.name,
                  let: { userId: "$sender" },
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
                  as: "sender",
                },
              },
              {
                $unwind: {
                  path: "$sender",
                  preserveNullAndEmptyArrays: true
                }
              }
            ],
            as: "latestMessage"
          }
        },
        {
          $unwind: {
            path: "$latestMessage",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: User.collection.name,
            let: { userId: "$users" },
            // _id of foreign field User
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$userId"] } } },
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                  username: 1,
                  coverPhoto: 1,
                  profilePic: 1,
                  _id: 0,
                },
              },
            ],
            as: "users",
          },
        },
      ],
      as: "chats"
    }
  }
];


const userDetailsPipeline = [
  ...followPipeline,
  ...retweetsPipeline,
  ...chatPipeline,
  {
    $lookup: {
      from: Post.collection.name,
      let: { postId: "$pinnedPost" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$postId"],
            },
          },
        },
        ...singlePostPipeline,
        {
          $sort: {
            createdAt: -1,
          },
        },
      ],
      as: "pinnedPost",
    },
  },
  {
    $unwind: {
      path: "$pinnedPost",
      preserveNullAndEmptyArrays: true,
    },
  },
];

const readByPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$readBy" },
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
            _id: 0,
            firstName: 1,
            lastName: 1,
            username: 1,
            profilePic: 1,
          }
        }
      ],
      as: "readBy"
    }
  },
];

const userFromPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$userFrom" },
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
            _id: 0,
            firstName: 1,
            lastName: 1,
            username: 1,
            profilePic: 1,
          }
        }
      ],
      as: "userFrom"
    }
  },
  {
    $unwind: {
      path: "$userFrom",
      preserveNullAndEmptyArrays: true
    }
  },
];


const notificationUseridPipeline = [
  {
    $lookup: {
      from: User.collection.name,
      let: { userId: "$userId" },
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
            _id: 0,
            firstName: 1,
            lastName: 1,
            username: 1,
            profilePic: 1,
          }
        }
      ],
      as: "userId"
    }
  },
  {
    $unwind: {
      path: "$userId",
      preserveNullAndEmptyArrays: true
    }
  },
];

module.exports = {
  postsPipeline,
  retweetDataPipeline,
  replyToPipeline,
  followPipeline,
  repliesPipeline,
  userDetailsPipeline,
  singlePostPipeline,
  retweetUsersPipeline,
  postedByPipeline,
  likesPipeline,
  chatPipeline,
  senderPipeline,
  readByPipeline,
  userFromPipeline,
  notificationUseridPipeline
};
