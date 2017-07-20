const express = require('express');
const Diet = require('../models/Diet');
const router = express.Router();


router.get('/', (req, res, next) => {

  Diet.find().populate("_creator").exec()
  .then(diets=>{
    if (req.user) {
        req.session.currentUser = req.user;

        res.render('index', {
          session: req.session.currentUser,
          diets:diets
        });
      }else {
        res.render('index', {
          session: undefined,
          diets:diets
        });
      }

  });
});





module.exports = router;
