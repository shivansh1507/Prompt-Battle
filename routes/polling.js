const express = require('express');
const Poll = require('../controllers/Polling');

const router = express.Router();

router.get("/getImages", Poll.getImage);
router.post("/vote", Poll.addVotes);

module.exports = router;