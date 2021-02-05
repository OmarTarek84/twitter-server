const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chats');


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

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/chat', chatRoutes);

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose
  .connect(
    `mongodb+srv://omar:${process.env.MONGO_PASS}@cluster1-tmn4p.mongodb.net/${process.env.DATABASE}?authSource=admin&replicaSet=Cluster1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
  )
  .then(() => {
    console.log('MONGODB CONNECTED');
  }).catch(err => {
      console.log(err);
    console.log('FAILED TO CONNECT MONGODB');
  });

app.listen(process.env.PORT || 8080);