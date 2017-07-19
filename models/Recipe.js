const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  name: {type:String, required:true},
  ingredients: String,
  rating: {type:Number, default:0},
  picture: String,
  people: Number,
  description:String,
  calories:Number,
  difficulty: {enum: ['Facil', 'Media','Dificil']},
  _creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  _diet: {type:mongoose.Schema.Types.ObjectId, ref:'Diet'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
