let router = require('express').Router();
const infectedAreaController = require('../../../controllers/areaController');

/**
 * This endpoints returns 
 */
router.get('/', infectedAreaController.getInfectedAreas);

module.exports = router;
