const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: "Artist"
    },
    album: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: "Album"
    },
    filePath: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model("Song", songSchema);