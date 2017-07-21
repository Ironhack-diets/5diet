const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: {type:String, required:true},
  _diet: {type:Schema.Types.ObjectId, ref:'Diet'},
  _creator: {type:Schema.Types.ObjectId, ref:'User'},
  userName: String,
  userPic: String

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
