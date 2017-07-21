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



/* Get the form to create a new diet*/
router.get('/:id/edit', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
Recipe.findById(req.params.id, (err, r) => {
    if(err){
      console.log(err);
    }
    res.render('recipes/edit', {
      recipe: r,
     session: req.session.currentUser
    });
  });

});

router.post('/:id/edit',upload.single('photo'), (req, res, next) => {
//TODO render to detailed view
console.log("holaaaaaaaaaaaaaa");
let updates = {
  name: req.body.name,
  ingredients: req.body.ingredients,
  people: req.body.people,
  calories: req.body.calories,
  picture: req.file.filename,
  description: req.body.description

};
console.log(updates);

Recipe.findByIdAndUpdate(req.params.id, updates, (err, r) => {
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


/* Get the form to create a new recipe*/
router.get('/:id/new', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
dietId = req.params.id;
  res.render('recipes/create',{
    dietId: dietId,
    session: req.session.currentUser,
    user: req.user
  });
});

/* Delete a new recipe*/
router.post('/:id/delete', (req, res, next) => {

//TODO delete an ID
let id = req.params.id;
console.log(id);
Recipe.findByIdAndRemove(id, (err, obj) => {
res.redirect("/");
if (err){ return next(err); }
});
});





module.exports = router;
