const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
        username: {
            type: String, 
            required: [true, "Please enter a Username"],
            unique: [true, "Please enter a unique Username"]
        },
		email: {
            type: String, 
            required: [true, "Please enter a eamil"],
            unique: [true, "Please enter a unique email"]
        },
		password: {
            type: String, 
            required: [true, "Please enter a password"]
        },
		votes: Number,
        submittedImages: Array,
        refreshToken: String
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
