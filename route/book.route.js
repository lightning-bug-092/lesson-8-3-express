var db = require("../db.js");
var express = require("express");
var router = express.Router();
var shortId = require('shortid');
router.get("/", function(req, res) {
  var books = db.get("books").value();
  res.render("./books/books.pug", {
    books: books
  });
});
router.get("/create", function(req, res) {
  res.render("./books/create.pug");
});
router.post("/create", function(req, res) {
  req.body.id = shortId.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});
router.get("/:id/update", function(req, res) {
  res.render("./books/update.pug");
});
router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("./books/delete.pug", {
    book: book
  });
});
router.post("/:id/update", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ description: req.body.description })
    .write();
  res.redirect("/books");
});
router.post("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
});

module.exports = router;
