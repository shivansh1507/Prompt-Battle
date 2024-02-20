const { Configuration, OpenAIApi } = require("openai");
const Polling = require('../models/Polling');
require("dotenv").config();
const Image = {
	async generate(req, res) {
		const { prompt } = req.body;
		const configuration = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const openAi = new OpenAIApi(configuration);

		try {
            const response = await openAi.createImage({
                prompt: prompt,
                n: 4,
                size: "512x512",
			});
			return res.status(200).json({
				message: "Images Generated",
				images: response.data,
			});
        } catch (error) {
            console.log(error.response.data);
			return res.status(500).json({ message: "Internal server error" });
		}
	},
	async submit(req, res) {
		const { imageUrl } = req.body;
		const user = req.user;

		try {
			await Polling.create({
				username: user.username,
				email: user.email,
				votedBy: [],
				image: imageUrl
			}).then(response => {
				return res.status(200).json({
					message : "Submitted"
				});
			}).catch(error => {
				console.log(error);
				return res.status(500).json({
					message : "Error while submitting"
				});
			});
		} catch (error) {
			return res.status(500).json({
				message : "Error while submitting"
			});
		}
	}
};

module.exports = Image;