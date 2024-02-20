const mongoose = require("mongoose");

const PollingSchema = new mongoose.Schema({
    username: String,
    email: String,
    votedBy: Array,
    image: String
}, { timestamp: true });

const Polling = mongoose.model('Polling', PollingSchema);

module.exports = Polling;