const mongoose = require('mongoose');
const User = mongoose.model('User');
const TipsFAQ = mongoose.model('TipsFAQ');
let router = require('express').Router();
const auth = require('../../auth');

const AUTHORIZED_USER = require('../../../config/roles').roles.ADMIN;

router.get('/', auth.optional, (req, res) => {
    let query = {};
    const limit = 10;
    let offset = 0;

    if (req.query.offset && Number.isInteger(parseInt(req.query.offset)))
        offset += parseInt(req.query.offset);

    TipsFAQ.find(query)
        .limit(limit)
        .skip(offset)
        .sort({createdAt: 'desc'})
        .then(results => {
            console.log(results);
            return res.json({
                faqs: results.map(faq => {
                    return faq.depopulate('author');
                })
            });
        })
        .catch(err => {
            console.err(err);
            return res.sendStatus(500);
        });
});

router.get('/faq', auth.optional, (req, res) => {
    const id = req.query.id ? req.query.id : undefined;
    if (!id) {
        TipsFAQ.findById(id, (err, doc) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            return res.status(200).json(doc.depopulate('author'));
        });
    } else {
        return res.sendStatus(400);
    }
});

router.post('/faq', auth.required, (req, res) => {
    if (auth.required) {
        if (req.payload.id) {
            User.findById(req.payload.id, (err, user) => {
                // return res.json(user)
                if (user.role === AUTHORIZED_USER) {
                    const {
                        title,
                        description,
                        visible
                    } = req.body.faq;

                    let tipsfaq = new TipsFAQ();
                    tipsfaq.title = title;
                    tipsfaq.description = description;
                    tipsfaq.visible = visible;
                    tipsfaq.author = user;

                    tipsfaq.save({validateBeforeSave: true}, (err, obj) => {
                        if (err) {
                            console.error(err);
                            return res.sendStatus(500);
                        }
                        return res.status(200).json({
                            mes: 'FAQ succesfully created . . .',
                            faq: obj.depopulate('author')
                        });
                    });
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
});

router.put('/faq', auth.required, (req, res) => {
    if (auth.required) {
        if (req.payload.id) {
            const id = req.query.id;
            TipsFAQ.findById(id, async (err, obj) => {
                if (obj.author._id.toString() === req.paylaod.id) {
                    const {
                        title,
                        description,
                        visible
                    } = req.body.faq;

                    obj.title = title;
                    obj.description = description;
                    obj.visible = visible;
                    await obj.save({validateBeforeSave: true})
                        .then(reso => {
                            console.log(reso);
                            return res.status(200).json({
                                mes: 'Succesfully changed . . .',
                                faq: reso
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.sendStatus(500);
                        })
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
});

router.delete('/faq', auth.required, (req, res) => {
    if (auth.required) {
        if (req.payload.id) {
            const id = req.query.id;
            TipsFAQ.findById(id, (err, obj) => {
                if (obj.author._id.toString() === req.payload.id)  {
                    obj.remove()
                        .then(reso => {
                            console.log(reso);
                            return res.status(200).json({
                                mes: 'Succesfully deleted',
                                faq: reso
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.sendStatus(500);
                        })
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;
