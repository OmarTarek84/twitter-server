const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/user');
const Chat = require('./models/chat');
const io = require('./socket');
// "start:prod": "pm2-runtime start ecosystem.config.js --env production"
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chats');
const notificationRoutes = require('./routes/notifications');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const server = app.listen(process.env.PORT || 8080);
const socket = io.init(server, {transports: ['websocket']});
// const io = require('socket.io')(server, {pingTimeout: 60000, cors: {origin: 'http://localhost:3000'}});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/chat', chatRoutes);
app.use('/notifications', notificationRoutes);

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    `mongodb+srv://omar:${process.env.MONGO_PASS}@cluster1-tmn4p.mongodb.net/${process.env.DATABASE}?authSource=admin&replicaSet=Cluster1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('MONGODB CONNECTED');
  }).catch(err => {
      console.log(err);
    console.log('FAILED TO CONNECT MONGODB');
  });

socket.on('connection', (nsSocket) => {
  console.log('SOCKET CONNECTED');

  nsSocket.on('disconnect', () => {
    console.log('socket disconnected');
  });

  nsSocket.on('loggedin', async email => {
    const foundUser = await User.findOne({email: email});
    console.log('myuser', foundUser._id);
    nsSocket.join(foundUser._id.toString());
  });

  nsSocket.on('loggedout', async email => {
    const foundUser = await User.findOne({email: email});
    nsSocket.leave(foundUser._id.toString());
  });

  nsSocket.on('join room', room => {
    nsSocket.join(room);
  });

  nsSocket.on('sendMessage', async data => {
    const foundChat = await Chat.findById(data.chatId);
    const myUser = await User.findOne({email: data.sender.email});
    foundChat.users.forEach(user => {
      if (user.toString() === myUser._id.toString()) return;
      console.log('user', user.toString());
      nsSocket.in(user.toString()).emit("message received", data);
    });
  });
});