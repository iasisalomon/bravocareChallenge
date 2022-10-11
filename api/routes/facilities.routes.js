const express = require('express');
const router = express.Router();
const facilitiesController = require('../controllers/facilitiesController.js');

/* GET users listing. */
router.get('/', facilitiesController.availableEndpoints);
router.get('/list', facilitiesController.getAllFacilities);
router.get('/score', facilitiesController.scoreNursesByFacility);
router.get('/score/:facility', facilitiesController.scoreNursesByFacilityId);
router.get('/remaining_spots', facilitiesController.jobs);
// router.get('/remaining_spots/:job_id', facilitiesController.scoreNursesByFacility);

module.exports = router;
