const express = require('express');
const User = require('../models/User');
const Diet = require('../models/Diet');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
var multer = require('multer');
var upload = multer({
  dest: './public/uploads/'
});
// CRUD => R: Retrieve All Users ¿??
router.get('/', function(req, res, next) {

  User.find({}, (err, u) => {
    res.render('product', {
      title: 'Express Marc',
      users: u
    });
  });
});
// CRUD => U: Update a user
router.post('/:id/edit', upload.single('photo'), function(req, res, next) {

  let updates = {
    name: req.body.name,
    lastname: req.body.lastname,
    personalWeb: req.body.personalWeb,
    email: req.body.email,
    picture: req.file.filename,
    description: req.body.description
  };
  User.findByIdAndUpdate(req.params.id, updates, (err, p) => {
    if (err) {
      console.log(err);
    }
    res.redirect(`/`);
  });
});
// CRUD => R: Retrieve - User detail
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
    .exec()
    .then(u => {
      Diet.find({
          _creator: req.params.id
        })
        .exec()
        .then(diets => {
          res.render('user/profile', {
            user: u,
            diets: diets,
            session: req.session.currentUser
          });
        });
    });
});
module.exports = router;
