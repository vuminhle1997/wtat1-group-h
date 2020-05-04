const mongoose = require('mongoose');
const InfectedArea = mongoose.model('InfectedArea');
let router = require('express').Router();

/**
 * This endpoints returns 
 */
router.get('/', (req, res) => {
    const limit = 20;
    let offset = 0;

    let minLat = -90, maxLat = 90, minLng = -180, maxLng = 180;

    if (req.query.minLat)
        minLat = Number.parseFloat(req.query.minLat);
        
    if (req.query.maxLat)
        maxLat = Number.parseFloat(req.query.maxLat);

    if (req.query.minLng)
        minLng = Number.parseFloat(req.query.minLng);

    if (req.query.maxLng)
        maxLng = Number.parseFloat(req.query.maxLng);

    if (req.query.offset)
        offsetr = Number.parseInt(req.query.offset);

    InfectedArea.find({
        latitude: {
            $gte: minLat,
            $lte: maxLat
        },
        longitude: {
            $gte: minLng,
            $lte: maxLng
        },
        active: true
    })
    .limit(limit)
    .skip(offset)
    .exec((err, results) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        return res.status(200).json(results);
    });
});

module.exports = router;
