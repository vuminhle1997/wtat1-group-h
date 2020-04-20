let router = require('express').Router();
const mongoose = require('mongoose');
let Report = mongoose.model('Report');
let User = mongoose.model('User');
const auth = require('../../auth');

router.get('/report', auth.required, (req, res) => {
    const id = req.query.id;
    if (req.payload.id) {
        if (id !== undefined) {
            Report.findById(id, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.json(err);
                }
                if (doc) return res.json(doc);
            });
        } else {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(400);
    }
});

router.post('/report', auth.required, (req, res) => {
    if (req.payload.id) {
        const {
            date,
            latitude,
            longitude, 
            symptoms,
            precondition,
            infected_area,
            infected_person,
            person_from_infected,
            details
        } = req.body.report;

        User.findById(req.payload.id, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }
            if (user) {
                let report = new Report();

                report.submitter = user;
                report.date = date;
                report.latitude = latitude;
                report.longitude = longitude;
                report.symptoms = symptoms;
                report.precondition = precondition;
                report.infected_area = infected_area;
                report.infected_person = infected_person;
                report.person_from_infected = person_from_infected;
                report.details = details;

                report.save({ validateBeforeSave: true }, (err, doc) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    } else {
                        return res.json(doc.depopulate('submitter'));
                    }
                });
            }
        });
    } else {
        return res.sendStatus(401);
    }
});

router.put('/report', auth.required, (req, res) => {

});

module.exports = router;