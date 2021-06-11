const express  = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'post Added Successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  posts = [
    {
      id:'cedchedc3j',
      title:'First Server-side post',
      content: 'First is coming from the serve'
    },
    {
      id:'ry754yt58',
      title:'Second Server-side post',
      content: 'Second is coming from the serve'
    },
    {
      id:'nhtn8t5thng',
      title:'Third Server-side post',
      content: 'Third is coming from the serve'
    },

  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
