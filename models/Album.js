const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true
    },
    song: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Song"
    }]
})

module.exports = mongoose.model("Album", albumSchema);

