var db = require("../db.js");
var express = require("express");
var router = express.Router();
var shortId = require('shortid');

  router.get("/create", function(req, res) {
      var books = db.get('books').value();
      var users = db.get('users').value();
    res.render("./transactions/create.pug",{
        books: books,
        users: users
    });
  });
  router.post("/create", function(req, res) {
   req.body.id = shortId.generate();
   db.get('transactions').push(req.body).write();
   res.redirect('/');
  });
module.exports = router;