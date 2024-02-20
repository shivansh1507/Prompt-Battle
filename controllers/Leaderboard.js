const User = require("../models/User")

const leaderBoard = {
    async getLeaderboard(req, res) {
        try {
            const leaderboard = (await User.find({ "votes": { $gt: 0 } })).map(userData => {
                return {
                    id: userData.id,
                    username: userData.username,
                    votes: userData.votes
                }
            });
            leaderboard.sort((a, b) => b.votes - a.votes);
            return res.status(200).json({ leaderboard, message: "Fetch Successful" });
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = leaderBoard;