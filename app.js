const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes Import
const leaderboard = require("./routes/leaderboard.js");
const user = require("./routes/user.js");
const image = require("./routes/images.js");
const poll = require("./routes/polling.js")
const verifyJWT = require("./middleware/verifyJWT.js");

// Configuration Updates
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan(":method :url Status - :status - :response-time ms :date[web]"));

// Routes Setup
app.use("/user", user);
app.use("/leaderboard", leaderboard);

app.use(verifyJWT);
app.use("/image", image);
app.use("/poll", poll);

// App Start
const PORT = process.env.PORT || 8080;

// Make sure to whitelist your ip before trying to access the mongo cluster
try {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
		})
		.then(() => {
			console.log(`Database Connected`);
			app.listen(PORT, () => {
				console.log(`Server started : ${PORT}`);
			});
		});
} catch (error) {
	console.error(error);
}
