const mongoose = require("mongoose");

const rootSchema = new mongoose.Schema({
    login: { type: String, minLength: 4, maxLength: 30, required: true },
    password: { type: String, minLength: 4, maxLength: 30, required: true },
});
const rootModel = mongoose.model("Root", rootSchema);

module.exports = rootModel;
