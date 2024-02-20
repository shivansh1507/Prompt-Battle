const Polling = require("../models/Polling");
const User = require("../models/User");

const Poll = {
	async getImage(req, res) {
		/**
		 * getImage() -->
		 * This would fetch all the images from the polling
		 * schema and use the user's username to filter out
		 * those which does not have the user's username in
		 * their votedby array. Then send that filtered
		 * array to the client side for getting vote on
		 * those elements.
		 */
		const user = req.user;

		const Images = await Polling.find({});

		const response = Images.filter((image) => {
			return !image.votedBy.find((username) => username == user.username);
		}).map((element) => ({
			id: element.id,
			image: element.image,
		}));
		return res.status(200).json({ response, message: "Data recieved" });
	},

	async addVotes(req, res) {
		/**
		 * It would recieve an array of 2 id's where the
		 * first element would be the id which got the vote,
		 * where as the second image will be an image that
		 * didn't get the vote.
		 *
		 * And username would be added to both the id's votedBy
		 * array
		 */

		const user = req.user;
		const { votes } = req.body;

        try {
            votes.forEach(async ({ id, vote }) => {
                const votedFor = await Polling.findOne({ _id: id });
                await Polling.updateOne(
                    { _id: id },
                    {
                        $push: {
                            votedBy: user.username,
                        },
                    }
                );
                await User.updateOne(
                    { email: votedFor.email },
                    {
                        $inc: {
                            votes: vote,
                        },
                    }
                );
            });

            return res.status(200).json({ message: "Successfully Voted" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error on our side" });
        }
	}
};

module.exports = Poll;
