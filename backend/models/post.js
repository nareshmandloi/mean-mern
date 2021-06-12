const mongoose = require('mongoose');

postSchema = mongoose.Schema({
  title: {type : String, requires: true,},
  content: {type : String, requires: true,}
});

module.exports = mongoose.model('Post', postSchema);
