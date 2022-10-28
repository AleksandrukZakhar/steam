const express = require("express");
const router = express.Router();
const Game = require("../models/game.js");

router.get("/", (req, res, next) => {
    res.render("index", { title: "Steam" });
});

router.get("/new", (req, res, next) => {
    res.render("form");
});

router.post("/new", (req, res, next) => {
    const { title, price, free, imgUrl, genre } = req.body;

    const newGame = new Game({ title, price, free, img: imgUrl, genre });
    newGame.save((err, result) => (err ? next(err) : console.log(result)));

    res.redirect("/");
});

module.exports = router;
