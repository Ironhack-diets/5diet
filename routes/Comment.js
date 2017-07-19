const express = require('express');
const router  = express.Router();
const Comment = require('../models/Comment');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

/* GET All the diets -> Diet.find() */
router.get('/', (req, res, next) => {
  Comment.find({}, (err, comments) => {
    res.render('index', {
      comments: comments
    });
  });
});

/* Delete a new diet*/
router.post('/:id/delete', (req, res, next) => {

//TODO delete an ID
let id = req.params.id;
console.log(id);
Comment.findByIdAndRemove(id, (err, obj) => {
res.redirect("/");
if (err){ return next(err); }
});
});





/* POST a new comment*/
router.post('/new', (req, res, next) => {
//TODO create the new diet and insert it on Mongo
let dietId = req.params.id;
let creatorId = req.session.passport.user;
console.log(req.body.content);

let c = new Comment({
    content: req.body.content,
    _diet: dietId,
    _creator: creatorId

  });
console.log(c);
  c.save((err, c) => {
    console.log(c);
    res.send(JSON.stringify(c));
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
