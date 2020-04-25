var express = require("express");
var router = express.Router();
var db = require("../db.js");
var shortId = require('shortid');
router.get("/", function(req, res) {
  var users = db.get("users").value();
  res.render("./users/users.pug", {
    users: users
  });
});
router.get("/create", function(req, res) {
  res.render("./users/create.pug");
});
router.get("/:id/update", function(req, res) {
  res.render("./users/update.pug");
});
router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("./users/delete.pug", {
    user: user
  });
});

router.post("/create", function(req, res) {
  req.body.id = shortId.generate(); 
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
router.post("/:id/update", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ phoneNumber: req.body.phoneNumber })
    .write();
  res.redirect("/users");
});
router.post("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});
module.exports = router;