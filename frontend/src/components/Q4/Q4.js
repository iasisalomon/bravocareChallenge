import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Q4() {
	//state
	const [facilities, setFacilities] = useState([]);
	const [facility, setFacility] = useState('100');
	const [jobsByFacility, setjobsByFacility] = useState([]);

	// render fire
	useEffect(() => {
		async function getData() {
			try {
				const resFac = await axios.get('http://localhost:3000/facilities/list');
				setFacilities(resFac.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

	// getters
	function getAllData(e) {
		e.preventDefault();
		async function fetchScores() {
			try {
				const resJobs = await axios.get('http://localhost:3000/facilities/jobs');
				setAllJobsValue(resJobs.data);
				const resNHJ = await axios.get('http://localhost:3000/facilities/nurse_hired_jobs');
				const resNurses = await axios.get('http://localhost:3000/facilities/nurses');
			} catch (error) {
				console.log(error);
			}
		}
		fetchScores();
	}

	//setters
	function setFacilityValue(e) {
		setFacility(e.target.value);
	}

	function setAllJobsValue(jobs) {
		console.log(jobs);
		// create a new array where you return all jobs that have facility_id === facility
		// then set that array to allJobs
		const jobs_by_facility = jobs.filter((job) => {
			return job.facility_id.toString() === facility;
		});
		setjobsByFacility(jobs_by_facility);
	}

	//render functions
	const selectFacilities = facilities.map((facility, index) => {
		return (
			<option key={index} value={facility.facility_id} defaultValue={index === 0 ? true : false}>
				{facility.facility_name}
			</option>
		);
	});

	// const scoresList = scores.map((score, index) => {
	// 	console.log(score);
	// 	return (
	// 		<div className='col border bg-light d-flex justify-content-center align-items-center border_div' key={index}>
	// 			<span className='text_big'>{score.nurse_id}</span>
	// 		</div>
	// 	);
	// });

	return (
		<div className='row px-3 my-3'>
			<div className='col px-0'>
				<select onChange={setFacilityValue} id='inputState' className='form-select'>
					{selectFacilities}
				</select>
			</div>
			<div className='col px-0'>
				<select onChange={setFacilityValue} id='inputState' className='form-select'>
					{}
				</select>
			</div>
			<div className='col'>
				<button onClick={getAllData} className='btn btn-success'>
					Submit
				</button>
			</div>
			<div className='row px-3 my-3'>
				<div className='col'>{facility}</div>
			</div>
			<div className='row px-3 my-3'>
				<div className='col'>{JSON.stringify(jobsByFacility)}</div>
			</div>
		</div>
	);
}

export default Q4;
