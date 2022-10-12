const sequelize = require('../database/database.js');

module.exports = {
	availableEndpoints: async (req, res, next) => {
		res.send({
			availableEndpoints: {
				facilities: {
					'/facilities/list': 'GET all facilities',
					'/facilities/score': 'GET all facilities with their nurses score',
					'/facilities/score/:facility_id': 'GET one facility with their nurses score',
					'/facilities/most_hired_nurse/:facility': 'GET the most hired nurse by facility',
				},
				jobs: {
					'/jobs/list': 'GET all jobs',
					'/jobs/vacancies': 'GET all jobs with their vacancies',
				},
				nurse_hired_jobs: {
					'/nurse_hired_jobs/list': 'GET all nurse hired jobs',
				},
				nurses: {
					'/nurses/list': 'GET all nurses',
					'/nurses/list/types': 'GET all nurse types',
					'/nurses/available/:nurseId': 'GET nurse availability by nurse id',
				},
			},
		});
	},
	getAllFacilities: async (req, res, next) => {
		try {
			const [results, metadata] = await sequelize.query('SELECT * FROM "facilities"');
			res.send(results);
		} catch (err) {
			res.send(err);
		}
	},
	getAllJobs: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "jobs"');
			res.send(results);
		} catch (err) {
			res.send(err);
		}
	},
	getAllJobsVacancies: async (req, res, next) => {
		try {
			const [jobs, jobs_meta] = await sequelize.query('SELECT * FROM "jobs"');
			const [nurse_hired_jobs, nurse_hired_jobs_meta] = await sequelize.query('SELECT * FROM "nurse_hired_jobs"');
			const allJobsIds = jobs.map((el) => {
				return el.job_id;
			});
			const uniqueJobIds = [...new Set(allJobsIds)];
			const jobsVacancies = uniqueJobIds.map((job) => {
				const jobVacancies = {
					job_id: job,
					vacancies: 0,
				};
				nurse_hired_jobs.forEach((nurse_hired_job) => {
					if (nurse_hired_job.job_id == job) {
						jobVacancies.vacancies++;
					}
				});
				return jobVacancies;
			});

			jobs.forEach((job) => {
				jobsVacancies.forEach((jobVacancy) => {
					if (job.job_id == jobVacancy.job_id) {
						job.total_number_nurses_needed = job.total_number_nurses_needed - jobVacancy.vacancies;
					}
				});
			});

			res.send(jobs);
		} catch (err) {
			res.send(err);
		}
	},
	getAllNurses: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "nurses"');
			res.send(results);
		} catch (err) {
			res.send(err);
		}
	},
	getNurseTypes: async (req, res, next) => {
		try {
			const [results, metadata] = await sequelize.query('SELECT * FROM "nurses"');
			const allNurseTypes = results.map((el) => {
				return el.nurse_type;
			});
			const uniqueNurseTypes = [...new Set(allNurseTypes)];
			res.send(uniqueNurseTypes);
		} catch (err) {
			res.send(err);
		}
	},
	getAllNuerseHiredJobs: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "nurse_hired_jobs"');
			res.send(results);
		} catch (err) {
			res.send(err);
		}
	},
	getAvailabilityByNurseId: async (req, res, next) => {
		const nurse_id = req.params.nurseId;

		try {
			const [jobs, jobs_meta] = await sequelize.query('SELECT * FROM "jobs"');
			const [nurse_hired_jobs, nurse_hired_jobs_meta] = await sequelize.query('SELECT * FROM "nurse_hired_jobs"');
			const [nurses, nurses_meta] = await sequelize.query('SELECT * FROM "nurses"');
			const allJobsIds = jobs.map((el) => {
				return el.job_id;
			});
			const uniqueJobIds = [...new Set(allJobsIds)];
			const alreadyHired = uniqueJobIds.map((job) => {
				const jobVacancies = {
					job_id: job,
					vacancies: 0,
				};
				nurse_hired_jobs.forEach((nurse_hired_job) => {
					if (nurse_hired_job.job_id == job) {
						jobVacancies.vacancies++;
					}
				});
				return jobVacancies;
			});
			//vacancies calc
			jobs.forEach((job) => {
				alreadyHired.forEach((jobVacancy) => {
					if (job.job_id == jobVacancy.job_id) {
						job.total_number_nurses_needed = job.total_number_nurses_needed - jobVacancy.vacancies;
					}
				});
			});

			//see all available jobs
			const allAvailableJobs = jobs.filter((job) => {
				return job.total_number_nurses_needed !== 0;
			});

			const nurseIsHired = nurse_hired_jobs.filter((nurse_hired_job) => {
				return nurse_hired_job.nurse_id == nurse_id;
			});

			const cannotBeHired = allAvailableJobs.filter((job) => {
				return nurseIsHired.map((nurse_hired_job) => nurse_hired_job.job_id).includes(job.job_id);
			});

			const availableJobs = allAvailableJobs.filter((job) => {
				return !cannotBeHired.map((nurse_hired_job) => nurse_hired_job.job_id).includes(job.job_id);
			});

			res.send([
				{
					nurse_id: nurse_id,
					available_jobs: availableJobs.length,
				},
			]);
		} catch (err) {
			res.send(err);
		}
	},
	scoreNursesByFacility: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "clinician_work_history"');
			const allNursesIds = results.map((el) => {
				return el.nurse_id;
			});
			const uniqueNursesIds = [...new Set(allNursesIds)];
			const allFacilitiesIds = results.map((el) => {
				return el.facility_id;
			});
			const uniqueFacilitiesIds = [...new Set(allFacilitiesIds)];
			uniqueNursesIds.map((nurse) => {
				uniqueFacilitiesIds.map((facility) => {
					let score = 0;
					results.map((el) => {
						if (el.nurse_id === nurse && el.facility_id === facility) {
							if (el.worked_shift === true) {
								score += 1;
							}
							if (el.call_out === true) {
								score -= 3;
							}
							if (el.no_call_no_show === true) {
								score -= 5;
							}
						}
					});
					aux.push({ nurse_id: nurse, facility_id: facility, score: score });
				});
			});
			aux.sort((a, b) => {
				return b.score - a.score;
			});
			res.send(aux);
		} catch (err) {
			res.send(err);
		}
	},
	scoreNursesByFacilityId: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "clinician_work_history"');
			const allNursesIds = results.map((el) => {
				return el.nurse_id;
			});
			const uniqueNursesIds = [...new Set(allNursesIds)];
			const allFacilitiesIds = results.map((el) => {
				return el.facility_id;
			});
			const uniqueFacilitiesIds = [...new Set(allFacilitiesIds)];
			const id = uniqueFacilitiesIds.find((el) => {
				return el.toString() === req.params.facility;
			});
			if (id) {
				uniqueNursesIds.map((nurse) => {
					let score = 0;
					results.map((el) => {
						if (el.nurse_id === nurse && el.facility_id === id) {
							if (el.worked_shift === true) {
								score += 1;
							}
							if (el.call_out === true) {
								score -= 3;
							}
							if (el.no_call_no_show === true) {
								score -= 5;
							}
						}
					});
					aux.push({ nurse_id: nurse, facility_id: id, score: score });
				});
				aux.sort((a, b) => {
					return b.score - a.score;
				});
				res.send(aux);
			} else {
				res.send({ error: 'Invalid facility ID' });
			}
		} catch (err) {
			res.send(err);
		}
	},
	mostHiredNurseByFacilityId: async (req, res, next) => {
		const param_facility_id = req.params.facility;
		try {
			const [res_jobs, jobs_metadata] = await sequelize.query('SELECT * FROM "jobs"');
			const [res_nurse_hired_jobs, nurse_hired_jobs_metadata] = await sequelize.query(
				'SELECT * FROM "nurse_hired_jobs"'
			);
			const [res_nurses, nurses_metadata] = await sequelize.query('SELECT * FROM "nurses"');

			const facilityJobs = res_jobs.filter((job) => {
				return job.facility_id == param_facility_id;
			});

			const nurseIds = res_nurse_hired_jobs.filter((nurse_hired_job) => {
				return facilityJobs.map((job) => job.job_id).includes(nurse_hired_job.job_id);
			});

			const mostHiredNurse = res_nurses.find((nurse) => {
				return nurseIds.map((nurseId) => nurseId.nurse_id).includes(nurse.nurse_id);
			});
			res.send(mostHiredNurse);
		} catch (err) {
			res.send(err);
		}
	},
};
