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
router.get('/jobs', facilitiesController.availableEndpoints);
router.get('/jobs/list', facilitiesController.getAllJobs);
router.get('/jobs/vacancies', facilitiesController.getAllJobsVacancies);

/* NURSE HIRED JOBS */
router.get('/nurse_hired_jobs', facilitiesController.availableEndpoints);
router.get('/nurse_hired_jobs/list', facilitiesController.getAllNuerseHiredJobs);

/* NURSES */
router.get('/nurses', facilitiesController.availableEndpoints);
router.get('/nurses/list', facilitiesController.getAllNurses);
router.get('/nurses/list/types', facilitiesController.getNurseTypes);

module.exports = router;
