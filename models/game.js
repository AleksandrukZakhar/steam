const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: { type: String, minLength: 3, maxLength: 100, required: true },
    price: { type: Number, required: true },
    free: { type: Boolean, required: true },
    img: { type: String, required: true },
    genre: { type: String, required: true },
});

module.exports = mongoose.model("Game", gameSchema);
