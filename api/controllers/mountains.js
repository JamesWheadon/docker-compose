const express = require("express");
const router = express.Router();

const Mountain = require("../models/mountain");

router.get('/', async (req, res) => {
    try {
        const mountains = await Mountain.all
        res.status(200).json({mountains})
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;