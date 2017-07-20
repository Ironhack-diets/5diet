const express = require('express');
const router  = express.Router();
const Diet = require('../models/Diet');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
/* GET All the diets -> Diet.find() */
router.get('/', (req, res, next) => {
  Diet.find({}, (err, diets) => {
    res.render('index', {
      diets: diets
    });
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
/* Get the form to create a new diet*/
router.get('/new', (req, res, next) => {
//TODO render new.ejs form and check if the user is login in.
  res.render('diets/create',{
    session:  req.session.currentUser
  });
});

/* GET a specific diet*/
router.post('/:id/edit',upload.single('photo'), (req, res, next) => {
//TODO render to detailed view
console.log(req.file);
let updates = {
  name: req.body.name,
  categories: req.body.categories,
  aim: req.body.aim,
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



/* GET the recipes for a specific diet*/
router.get('/:id/recipes', (req, res, next) => {
//TODO render to detailed view
Recipe.find({_diet:req.params.id}).populate('_diet')
    .exec()
    .then(recipes => {
      res.render('diets/recipes', {
        recipes: recipes,
        idDiet: req.params.id,
        session: req.session.currentUser,
        user: req.user
      });

    })
    .catch(err => console.log(err));

});


/* GET a specific diet*/
router.get('/:id', (req, res, next) => {
//TODO render to detailed view

Diet.findById(req.params.id).populate('_creator')
  .exec()
  .then(diet => {
    Recipe.find({_diet:req.params.id})
    .exec()
    .then(recipes => {
      Comment.find({_diet:req.params.id}).populate('_creator')
      .exec()
      .then(comments => {
        res.render('diets/detail',{
          diet: diet,
          session: req.session.currentUser,
          recipes: recipes,
          comments: comments
        });
      });

    });
  });

});

/* Delete a new diet*/
router.post('/:id/delete', (req, res, next) => {

//TODO delete an ID
let id = req.params.id;
console.log(id);
Diet.findByIdAndRemove(id, (err, obj) => {
res.redirect("/");
if (err){ return next(err); }
});
});

module.exports = router;
