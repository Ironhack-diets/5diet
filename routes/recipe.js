const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

/* GET All the diets -> Diet.find() */
router.get('/', (req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    res.render('index', {
      recipes: recipes
    });
  });
});

/* Delete a new diet*/
router.post('/:id/delete', (req, res, next) => {

//TODO delete an ID
let id = req.params.id;
console.log(id);
Recipe.findByIdAndRemove(id, (err, obj) => {
res.redirect("/");
if (err){ return next(err); }
});
});

/* Get the form to create a new diet*/
router.get('/:id/edit', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
Recipe.findById(req.params.id, (err, d) => {
    if(err){
      console.log(err);
    }
    res.render('diets/edit', {
      diet: d,
      session: req.session.currentUser
    });
  });

});


/* GET a specific diet*/
router.post('/:id/edit', (req, res, next) => {
//TODO render to detailed view

let updates = {
  name: req.body.name,
  categories: req.body.categories,
  description: req.body.description
};
console.log(updates);

Recipe.findByIdAndUpdate(req.params.id, updates, (err, d) => {
  if(err){
    console.log(err);
  }
  res.redirect(`/`);
});

});


/* POST a new recipe*/
router.post('/:id/new', upload.single('photo'), (req, res, next) => {
//TODO create the new diet and insert it on Mongo
let dietId = req.params.id;
let creatorId = req.session.passport.user;


let r = new Recipe({
    _creator: creatorId,
    name: req.body.name,
    ingredients: req.body.ingredients,
    picture: req.file.filename,
    people: req.body.people,
    calories: req.body.calories,
    description: req.body.description,
    difficulty: req.body.difficulty,
    _diet: dietId

  });

  r.save((err, obj) => {
    res.redirect('/');
  });

});


/* Get the form to create a new diet*/
router.get('/:id/new', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
dietId = req.params.id;
  res.render('recipes/create',{
    dietId: dietId,
    session: req.session.currentUser,
    user: req.user
  });
});







module.exports = router;
