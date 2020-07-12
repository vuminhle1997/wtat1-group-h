let router = require('express').Router();
const auth = require('../../auth');
const reportController = require('../../../controllers/reportController');

router.get('/', reportController.getReports);

router.get('/user', auth.optional, reportController.getReportsByOneUser);

router.get('/report', auth.optional, reportController.getReport);

router.post('/fakeReport', reportController.createFakeReport);

router.post('/report', auth.optional, reportController.createReport);

router.put('/report', auth.optional, reportController.editReport);

router.delete('/report', auth.optional, reportController.deleteReport);

router.put('/positive', auth.required, reportController.approveCovid);

router.put('/negative', auth.required, reportController.negativeCovid);

module.exports = router;

