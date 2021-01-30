const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    next();
  }
  const token = authHeader ? authHeader.split(" ")[1]: null;
  if (!token) {
    req.isAuth = false;
    next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = {
    _id: decodedToken._id,
    email: decodedToken.email,
    firstName: decodedToken.firstName,
    lastName: decodedToken.lastName,
    userName: decodedToken.userName,
    profilePic: decodedToken.profilePic,
    retweets: decodedToken.retweets
  };
  next();
};
