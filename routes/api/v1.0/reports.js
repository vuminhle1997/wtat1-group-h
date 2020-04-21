let router = require('express').Router();
const mongoose = require('mongoose');
let Report = mongoose.model('Report');
let User = mongoose.model('User');
const InfectedArea = mongoose.model('InfectedArea');
const auth = require('../../auth');

const USER = require('../../../config/roles').roles.USER;
const parseBoolean = require('../../../config/helper').parseBoolean;

router.get('/', (req, res) => {
    let query = {};
    const limit = 10;
    let offset = 0;

    if (req.query.offset && Number.isInteger(parseInt(req.query.offset)))
        offset += parseInt(req.query.offset);
    
    if (req.query.infected_area) 
        query.infected_area = parseBoolean(req.query.infected_area);
    
    if (req.query.infected_person) 
        query.infected_person = parseBoolean(req.query.infected_person);
    
    if (req.query.person_from_infected) 
        query.person_from_infected = parseBoolean(req.query.person_from_infected);

    // if (req.query.symptoms)
    //     query.symptoms = req.query.symptoms;

    // if (req.query.precondition)
    //     query.precondition = req.query.precondition;

    // if (req.query.details)
    //     query.details = req.query.details;

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
        });
});

router.get('/report', auth.required, (req, res) => {
    const id = req.query.id;
    if (req.payload.id) {
        if (id !== undefined) {
            Report.findById(id, (err, doc) => {
                if (err) {
                    console.error(err);
                    return res.json(err);
                }
                if (doc) return res.json(doc.depopulate('submitter'));
                else   
                    return res.sendStatus(404);
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
                console.error(err);
                return res.sendStatus(401);
            }
            if (user && user.role === USER) {
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

                report.save({ validateBeforeSave: true }, (err, re) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } else {
                        infectedArea.report = re;
                        infectedArea.longitude = longitude;
                        infectedArea.latitude = latitude;
                        infectedArea.active = true;

                        infectedArea.save({ validateBeforeSave: true }, (err, ia) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({mes: 'Could not store IA . . .'});
                            }
                            return res.status(200).json(re.depopulate('submitter'));
                        });
                    }
                });
            } else {
                console.error('User not found . . . ');
                return res.sendStatus(404);
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

                doc.save({ validateBeforeSave: true }, async (err, obj) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } 

                    await InfectedArea.findOne({
                        report: _id
                    })
                    .then(ia => {
                        ia.latitude = latitude;
                        ia.longitude = longitude;
                        ia.save({ validateBeforeSave: true })
                            .then(() => {
                                console.log(`Infected area and Report are changed . . .`);
                                return res.status(200).json({
                                    mes: 'IA and report edited . . .',
                                    report: obj.depopulate('submitter')
                                });
                            })
                    })
                    .catch(err => {
                        console.error(err);
                        return res.sendStatus(500);
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
        Report.findById(_id, async(err, doc) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            if (doc.submitter._id.toString() === req.payload.id) {
                await InfectedArea.findOne({report: _id}, (err, doc) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(401);
                    } 
                    doc.remove()
                        .then(ia => {
                            console.log('IA deleted . . .')
                        })
                        .catch(err => {
                            console.error(err);
                            return res.sendStatus(500);
                        });
                });
                doc.remove((err, obj) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } 
                    return res.status(200).json({
                        mes: 'Report deleted and IA . . .',
                        report: obj.depopulate('submitter')
                    });
                });
            }
        });
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;