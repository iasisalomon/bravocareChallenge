const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController');
const facilitiesController = require('../controllers/otherControllers.js');

/* INDEX */
router.get('/', indexController.index);

/* FACILITIES */
router.get('/facilities', facilitiesController.availableEndpoints);
router.get('/facilities/list', facilitiesController.getAllFacilities);
router.get('/facilities/score', facilitiesController.scoreNursesByFacility);
router.get('/facilities/score/:facility', facilitiesController.scoreNursesByFacilityId);

/* JOBS */
router.get('/jobs', facilitiesController.getAllJobs);

/* NURSE HIRED JOBS */
router.get('/nurse_hired_jobs', facilitiesController.getAllNuerseHiredJobs);

/* NURSES */
router.get('/nurses', facilitiesController.getAllNurses);

module.exports = router;
