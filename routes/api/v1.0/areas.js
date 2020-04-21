const mongoose = require('mongoose');
const InfectedArea = mongoose.model('InfectedArea');
let router = require('express').Router();

router.get('/', (req, res) => {
    let query = {};
    const limit = 20;
    let offset = 0;

    let latRange = 0;
    let lngRange = 0;

    if (req.query.longitude)
        lngRange = req.query.longitude;

    if (req.query.latitude)
        latRange

    if (req.query.longitudeRange)
        query.longitudeRange = req.query.longitudeRange;

    if (req.range.latitudeRange)
        query.latitudeRange = req.query.latitudeRange;

        
});

module.exports = router;
