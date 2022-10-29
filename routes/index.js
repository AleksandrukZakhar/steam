const { urlencoded } = require("express");
const express = require("express");
const router = express.Router();
const Game = require("../models/game.js");

router.get("/", async (req, res, next) => {
    const games = await Game.find().sort({ price: 1 });
    const genres = await Game.aggregate([
        { $project: { genre: 1, _id: 0 } },
        { $group: { _id: "$genre" } },
    ]);

    res.render("index", { title: "Steam", games, genres });
});

router.get("/new", (req, res, next) => {
    res.render("form");
});

router.post("/new", async (req, res, next) => {
    const { title, price, free, imgUrl, genre } = req.body;

    const newGame = new Game({ title, price, free, img: imgUrl, genre });
    newGame.save((err, result) => (err ? next(err) : console.log(result)));

    res.redirect("/");
});

router.get("/update/:id", (req, res, next) => {
    res.render("form");
});

router.post("/update/:id", async (req, res, next) => {
    const { title, price, free, imgUrl, genre } = req.body;

    await Game.updateOne(
        { _id: JSON.stringify(req.params.id) },
        {
            $set: {
                title,
                price,
                free,
                img: imgUrl,
                genre,
            },
        },
        { multi: true },
        (err, result) => (err ? next(err) : console.log(result))
    );

    res.redirect("/");
});

router.post("/delete/:id", async (req, res, next) => {
    await Game.deleteOne({ _id: req.params.id });

    res.redirect("/");
});

router.get("/genres/:genre", async (req, res, next) => {
    const games = await Game.find({ genre: req.params.genre });

    res.render("filter", { games });
});

module.exports = router;
