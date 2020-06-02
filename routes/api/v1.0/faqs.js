let router = require('express').Router();
const auth = require('../../auth');

const faqController = require('../../../controllers/faqsController');

router.get('/', auth.optional, faqController.getFAQs);

router.get('/faq', auth.optional, faqController.getFAQ);

router.post('/faq', auth.required, faqController.createFAQ);

router.put('/faq', auth.required, faqController.editFAQ);

router.delete('/faq', auth.required, faqController.deleteFAQ);

module.exports = router;
