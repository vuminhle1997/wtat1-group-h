let router = require('express').Router();
const mongoose = require('mongoose');
let Report = mongoose.model('Report');
let User = mongoose.model('User');
const InfectedArea = mongoose.model('InfectedArea');
const auth = require('../../auth');


router.get('/', (req, res) => {
    let query = {};
    const limit = 10;
    let = offset = 0 + req.query.skip;

    if (typeof req.query.infected_area !== undefined) {
        query.infected_area = req.query.infected_area;
    }

    if (typeof req.query.infected_person !== undefined) {
        query.infected_person = req.query.infected_person;
    }

    if (typeof req.query.person_from_infected !== undefined) {
        query.person_from_infected = req.query.person_from_infected;
    }

    Report.find(query)
        .limit(limit)
        .skip(offset)
        .sort({date: 'desc'})
        .exec((err, results) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            
            return res.json(results.map(obj => {
                return obj.depopulate('submitter');
            }));
        })
        .catch(err => {
            console.error(err);
            return res.sendStatus(400);
        });
});

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

        User.findById(req.payload.id, async(err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }
            if (user) {
                let report = new Report();
                let infectedArea = new InfectedArea();

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

                infectedArea.longitude = longitude;
                infectedArea.latitude = latitude;
                infectedArea.active = true;

                await infectedArea.save({ validateBeforeSave: true}, (err, doc) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({mes: 'Something went wrong . . .'});
                    }
                });

                await report.save({ validateBeforeSave: true }, (err, doc) => {
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

router.put('/report', auth.required, async (req, res) => {
    if (req.payload.id) {
        const {
            _id,
            date,
            latitude,
            longitude, 
            symptoms,
            precondition,
            infected_area,
            infected_person,
            person_from_infected,
            details
        } = req.body.report; // report object

        await InfectedArea.findOne({
                report: _id
            })
            .then(doc => {
                doc.latitude = latitude;
                doc.longitude = latitude;
                doc.save({validateBeforeSave: true})
                    .then(() => {
                        console.log(`Infected area changed . . .`)
                    })
            })
            .catch(err => {
                console.error(err);
                return res.sendStatus(500);
            });

        await Report.findById(_id, (err, doc) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            if (doc.submitter._id.toString() === req.payload.id) {
                doc.date = date;
                doc.latitude = latitude;
                doc.longitude = longitude;
                doc.symptoms = symptoms;
                doc.precondition = precondition;
                doc.infected_area = infected_area;
                doc.infected_person = infected_person;
                doc.person_from_infected = person_from_infected;
                doc.details = details;

                doc.save({ validateBeforeSave: true }, (err, obj) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } 
                    return res.json({
                        status: 200,
                        report: obj.depopulate('submitter')
                    });
                });
            }
        }).catch(err => {
            console.error(err);
            return res.sendStatus(404);
        });
    }
});

router.delete('/report', auth.required, (req, res) => {
    const { _id } = req.body.report;
    if (req.payload.id) {
        Report.findById(_id, (err, doc) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            if (doc.submitter._id.toString() === req.payload.id) {
                doc.remove((err, obj) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } 
                    return res.json({
                        status: 200,
                        mes: 'Report succesfully deleted . . .'
                    });
                });
            }
        });
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;