// vORn25QzQuSg3uFj
//157.34.70.160
//157.34.70.160/32
const express  = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://naresh:vORn25QzQuSg3uFj@cluster0.fj5bb.mongodb.net/node-angular?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database!');
})
.catch((error) => {
  console.log(error);
  console.log('Connection failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
   "GET, POST, PATCH, DELETE, OPTIONS");
 next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post Added Successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });
});

// app.delete("/api/posts:id", (req, res, next) => {
//  console.log(req.params.id);
//   res.status(200).json({message: 'Post Deleted!'});
// });

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
