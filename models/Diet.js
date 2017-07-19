const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const dietSchema = new Schema({
  name: {type:String, required:true},
  categories: String,
  rating: {type:Number, default:0},
  picture: String,
  aim: String,
  description:String,
  cost:String,
  _creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Diet = mongoose.model("Diet", dietSchema);
module.exports = Diet;
