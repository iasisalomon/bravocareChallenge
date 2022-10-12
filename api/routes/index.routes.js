const express = require('express');
const router = express.Router();

// controllers
const otherControllers = require('../controllers/otherControllers.js');

/* INDEX */
router.get('/', otherControllers.availableEndpoints);

/* FACILITIES */
router.get('/facilities', otherControllers.availableEndpoints);
router.get('/facilities/list', otherControllers.getAllFacilities);
router.get('/facilities/score', otherControllers.scoreNursesByFacility);
router.get('/facilities/score/:facility', otherControllers.scoreNursesByFacilityId);
router.get('/facilities/most_hired_nurse/:facility', otherControllers.mostHiredNurseByFacilityId);

/* JOBS */
router.get('/jobs', otherControllers.availableEndpoints);
router.get('/jobs/list', otherControllers.getAllJobs);
router.get('/jobs/vacancies', otherControllers.getAllJobsVacancies);

/* NURSE HIRED JOBS */
router.get('/nurse_hired_jobs', otherControllers.availableEndpoints);
router.get('/nurse_hired_jobs/list', otherControllers.getAllNuerseHiredJobs);

/* NURSES */
router.get('/nurses', otherControllers.availableEndpoints);
router.get('/nurses/list', otherControllers.getAllNurses);
router.get('/nurses/list/types', otherControllers.getNurseTypes);
router.get('/nurses/available/:nurseId', otherControllers.getAvailabilityByNurseId);

module.exports = router;
