const express = require("express");
const router = express.Router();

const Mountain = require("../models/mountain");

router.get('/', async (req, res) => {
    try {
        const mountains = await Mountain.all;
        res.status(200).json({mountains});
    } catch(err) {
        res.status(500).json({err});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const mountain = await Mountain.findById(parseInt(req.params.id));
        res.status(200).json({mountain});
    } catch(err) {
        res.status(404).json({err});
    }
})

router.post('/', async (req, res) => {
    try {
        const mountain = await Mountain.create(req.body);
        res.status(201).json({mountain});
    } catch (err) {
        res.status(404).json({err});
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const mountain = await Mountain.findById(parseInt(req.params.id));
        const updatedMountain = await mountain.update(req.body);
        res.status(201).json({updatedMountain});
    } catch (err) {
        res.status(404).json({err});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const mountain = await Mountain.findById(parseInt(req.params.id));
        await mountain.destroy();
        res.status(204).json('Mountain deleted');
    } catch (err) {
        res.status(500).json({err});
    }
})

module.exports = router;