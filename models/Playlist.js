const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Song"
    }]
})

module.exports = mongoose.model("Playlist", playlistSchema)