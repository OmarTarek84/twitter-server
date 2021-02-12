const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifictionSchema = new Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notificationType: String,
    opened: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.Mixed,
      ref: "User",
    },
    postId: {
      type: Schema.Types.Mixed,
      ref: "Post",
    },
    chatId: {
      type: Schema.Types.Mixed,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

notifictionSchema.statics.insertNotification = async (
  userTo,
  userFrom,
  notificationType,
  userId,
  postId,
  chatId
) => {
  const data = {
    userTo: userTo,
    userFrom: userFrom,
    notificationType: notificationType,
    userId: userId,
    postId: postId,
    chatId: chatId,
  };

  await Notification.deleteOne(data);
  await Notification.create(data);
};

var Notification = mongoose.model("Notification", notifictionSchema);
module.exports = Notification;
