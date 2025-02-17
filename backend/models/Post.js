// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    imageUrl: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
