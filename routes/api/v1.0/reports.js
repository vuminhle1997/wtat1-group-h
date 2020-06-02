let router = require('express').Router();
const auth = require('../../auth');
const reportController = require('../../../controllers/reportController');

router.get('/', reportController.getReports);

router.get('/user', auth.optional, reportController.getReportsByOneUser);

router.get('/report', auth.required, reportController.getReport);

router.post('/fakeReport', reportController.createFakeReport);

router.post('/report', auth.required, reportController.createReport);

router.put('/report', auth.required, reportController.editReport);

router.delete('/report', auth.required, reportController.deleteReport);

router.put('/positive', auth.required, reportController.approveCovid);

module.exports = router;