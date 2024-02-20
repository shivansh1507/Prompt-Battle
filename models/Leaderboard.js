const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
    userName: String,
    votes: Number,
}, { timestamps: true });

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);

module.exports = Leaderboard;