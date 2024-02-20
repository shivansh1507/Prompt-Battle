const User = require("../models/User");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	console.log(cookies.jwt);
	if (!cookies?.jwt) {
		return res.status(401).json({
			message: "Error verifying the user",
		});
	}

	const refreshToken = cookies.jwt;

	const user = await User.findOne({ refreshToken: refreshToken });

	if (!user) {
		return res.status(403).json({
			message: "Forbidden User",
		});
	}

	if (!cookies?.jwt) {
		return res.status(403).json({
			message: "Forbidden User",
		});
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
        (error, decode) => {
			if (error || user.email !== decode.user.email)
				return res.status(403).json({ message: "Forbidden" });

			const accessToken = jwt.sign(
				{
					user: decode.user,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);

			return res.status(200).json({ accessToken: accessToken });
		}
	);
};

module.exports = handleRefreshToken;
