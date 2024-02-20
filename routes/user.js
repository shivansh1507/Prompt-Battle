const express = require("express");
const UserData = require("../controllers/UserData");
const handleRefreshToken = require("../controllers/RefreshToken");
const handleLogout = require("../controllers/LogoutUser");

const router = express.Router();

router.post("/register", UserData.register);
router.post("/login", UserData.login);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", handleLogout);


module.exports = router;
