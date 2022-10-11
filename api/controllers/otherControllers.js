const sequelize = require('../database/database.js');

module.exports = {
	availableEndpoints: async (req, res, next) => {
		res.send({
			availableEndpoints: {
				'/facilities/list': 'GET all facilities',
				'/facilities/score': 'GET all facilities with their nurses score',
				'/facilities/score/:facility_id': 'GET one facility with their nurses score',
				'/jobs/list': 'GET all jobs',
				'/nurse_hired_jobs/list': 'GET all nurse hired jobs',
				'/nurses/list': 'GET all nurses',
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
	getAllNuerseHiredJobs: async (req, res, next) => {
		try {
			let aux = [];
			const [results, metadata] = await sequelize.query('SELECT * FROM "nurse_hired_jobs"');
			res.send(results);
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
};
