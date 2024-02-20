const express = require('express');
const Image = require('../controllers/Image');

const router = express.Router();

router.post("/generate", Image.generate);
router.post("/submit", Image.submit);

module.exports = router;