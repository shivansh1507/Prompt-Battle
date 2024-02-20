const User = require("../models/User");

const handleLogout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.status(204).json({
			message: "Logout Successfully",
		});
	}

	const refreshToken = cookies.jwt;
	const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(204).json({
            message: "Logout Successfully",
        });
    }
    await User.updateOne(
        { _id: user.id },
        {
            $set: {
                ...user._doc,
                refreshToken: "",
            },
        }
    );
    return res.status(204).json({
        message: "Logout Successfully",
    });
};

module.exports = handleLogout;
