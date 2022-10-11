import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Q4() {
	//state
	const [jobs, setJobs] = useState([]);
	const [job, setJob] = useState('200');
	const [vacancies, setVacancies] = useState([]);

	// render fire
	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get('http://localhost:3000/jobs/list');
				setJobs(res.data.sort((a, b) => a.job_id - b.job_id));
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
				const res = await axios.get('http://localhost:3000/jobs/vacancies');
				setVacancies(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchScores();
	}

	//setters
	function setJobValue(e) {
		setJob(e.target.value);
	}

	//render functions
	const selectJobs = jobs.map((job, index) => {
		return (
			<option key={index} value={job.job_id} defaultValue={index === 0 ? true : false}>
				{job.job_id}
			</option>
		);
	});

	function renderVacancies() {
		if (vacancies.length > 0) {
			const vacancyObject = vacancies.filter((vacancy) => {
				return vacancy.job_id.toString() === job;
			});
			return (
				<>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'job_id' + vacancyObject[0].job_id}
					>
						<span className='text_big'>{vacancyObject[0].job_id}</span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'facility_id' + vacancyObject[0].facility_id}
					>
						<span className='text_big'>{vacancyObject[0].facility_id} </span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'nurse_type_needed' + vacancyObject[0].nurse_type_needed}
					>
						<span className='text_big'>{vacancyObject[0].nurse_type_needed} </span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'total_number_nurses_needed' + vacancyObject[0].total_number_nurses_needed}
					>
						<span className='text_big'>{vacancyObject[0].total_number_nurses_needed} </span>
					</div>
				</>
			);
		} else {
			return (
				<div className='col border bg-light d-flex justify-content-center align-items-center border_div'>
					<span className='text_big'>No data</span>
				</div>
			);
		}
	}

	return (
		<>
			<div className='row px-3 my-3'>
				<div className='col'>
					<h4>Vacancies per Job Listing</h4>
				</div>
			</div>
			<div className='row px-3 my-3'>
				<div className='col px-0'>
					<select onChange={setJobValue} id='inputState' className='form-select'>
						{selectJobs}
					</select>
				</div>
				<div className='col'>
					<button onClick={getAllData} className='btn btn-success'>
						Submit
					</button>
				</div>
				<div className='row px-3 my-2 gap-3'>{renderVacancies()}</div>
			</div>
		</>
	);
}

export default Q4;
