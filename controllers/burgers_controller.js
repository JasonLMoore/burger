//init commit//
const express = require("express");
//idea taken from activity 17, seemed like a good idea//
const router = express.Router();
///////////////////////////////////
const burger = require("../models/burger.js");

//read all burgers//
router.get("/", function (req, res) {
  burger.all(function (data) {
    let indexObject = {
      burgers: data
    };
    console.log(indexObject);
    res.render("index", indexObject);
  });
});

//create burger//
router.post("/api/burgers", function (req, res) {
  burger.create([
    "burger_name", 
    "devoured"
  ], [
      req.body.name, req.body.sleepy
    ], function (result) {
      res.json({ id: result.insertId });
    });
});

//update burger//
router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//destroy burger//
router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;