const Notification = require("../models/notification");
const mongoose = require('mongoose');
const { userFromPipeline, notificationUseridPipeline } = require("./pipelines");

exports.getNotifications = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const pageSize = +req.query.pageSize || 30;
  const currentPage = +req.query.currentPage || 1;

  try {
    const allNotifications = await Notification.aggregate([
      {$match: {userTo: require('mongoose').Types.ObjectId(req.user._id)}},
      {$project: {userTo: 0}},
      {
        $facet: {
          notifications: [
            ...userFromPipeline,
            ...notificationUseridPipeline,
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
            ...userFromPipeline,
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
      allNotifications[0] && allNotifications[0].pagination
        ? allNotifications[0].pagination.totalItemsCount
        : 0;
    return res.status(200).json({
      ...allNotifications[0],
      totalItemsCount: totalItemsCount,
      pageSize: +pageSize,
      currentPage: +currentPage || 1,
      pages: Math.ceil(totalItemsCount / pageSize),
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({message: 'Server Error'});
  }
};


exports.markRead = async (req, res) => {
  if (!req.isAuth) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const markAll = req.query.markAll;
    const notificationId = req.params.notificationId;

    if (notificationId != 'null' && !mongoose.isValidObjectId(notificationId)) {
      return res.status(500).json({message: 'Invalid Object ID'});
    }

    console.log(markAll);
    if (markAll === 'true') {
      await Notification.updateMany({
        userTo: req.user._id
      }, {$set: {
        opened: true
      }});
    } else {
      await Notification.findByIdAndUpdate(notificationId, {
        opened: true
      }, {useFindAndModify: false});
    }

    return res.status(200).json({
      message: 'success',
      markAll: markAll
    });

  } catch(err) {
    console.log(err);
    return res.status(500).json({message: 'Server Error'});
  }
};