const express = require('express');
const router  = express.Router();
const Diet = require('../models/Diet');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Recipe = require('../models/Recipe');

/* GET All the diets -> Diet.find() */
router.get('/', (req, res, next) => {
  Diet.find({}, (err, diets) => {
    res.render('index', {
      diets: diets
    });
  });
});

/* Delete a new diet*/
router.post('/:id/delete', (req, res, next) => {

//TODO delete an ID
let id = req.params.id;
console.log(id);
Diet.findByIdAndRemove(id, (err, obj) => {
res.redirect("/user/:id");
if (err){ return next(err); }
});
});

/* Get the form to create a new diet*/
router.get('/:id/edit', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
Diet.findById(req.params.id, (err, d) => {
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

Diet.findByIdAndUpdate(req.params.id, updates, (err, d) => {
  if(err){
    console.log(err);
  }
  res.redirect(`/`);
});

});


/* POST a new diet*/
router.post('/new', upload.single('photo'), (req, res, next) => {
//TODO create the new diet and insert it on Mongo

let creatorId = req.session.passport.user;
console.log(creatorId);
let d = new Diet({
    _creator: creatorId,
    name: req.body.name,
    categories: req.body.categories,
    picture: req.file.filename,
    aim: req.body.aim,
    description: req.body.description
  });
  console.log(d);
  d.save((err, obj) => {
    res.redirect('/');
  });

});


/* Get the form to create a new diet*/
router.get('/new', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
  res.render('diets/create',{
    session: req.session.currentUser
  });
});


/* GET the recipes for a specific diet*/
router.get('/:id/recipes', (req, res, next) => {
//TODO render to detailed view
Recipe.find({_diet:req.params.id}).populate('_diet').exec()

    .then(recipes => {
      console.log(recipes._diet);
      res.render('diets/recipes', {
        recipes: recipes,
        idDiet: req.params.id,
        session: req.session.currentUser,
        user: req.user
      });

    })
    .catch(err => console.log(err));
/*Recipe.find({_diet:req.params.id}, (err, recipes) => {
  if(err){
    console.log(err);
  }
  console.log(recipes);
  res.render('diets/recipes', {
    recipes: recipes
  });
});*/

});


/* GET a specific diet*/
router.get('/:id', (req, res, next) => {
//TODO render to detailed view

Diet.findById(req.params.id, (err, diet) => {
  Recipe.find({_diet:req.params.id}, (err,recipes)=> {
    res.render('diets/detail', {
      diet: diet,
      session: req.session.currentUser,
      recipes: recipes
    });
  });


});

});

module.exports = router;
