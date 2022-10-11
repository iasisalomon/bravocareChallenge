import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Q4() {
	//state
	const [nurses, setNurses] = useState([]);
	const [nurse, setNurse] = useState('');
	const [availableJobs, setAvailableJobs] = useState([]);
	const [selectedNurse, setSelectedNurse] = useState([]);

	// render fire
	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get('http://localhost:3000/nurses/list/');
				setNurses(res.data.sort((a, b) => a.nurse_id - b.nurse_id));
				setNurse(res.data[0].nurse_id);
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
				const res = await axios.get('http://localhost:3000/nurses/available/' + nurse);
				setAvailableJobs(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		const a = nurses.find((nur) => {
			return nur.nurse_id.toString() === nurse.toString();
		});
		setSelectedNurse(a);
		fetchScores();
	}

	//setters
	function setJobValue(e) {
		setNurse(e.target.value);
		const selectedNurse = nurses.find((nurse) => {
			return nurse.nurse_id.toString() === e.target.value;
		});
		setSelectedNurse(selectedNurse);
	}

	//render functions
	const selectNurse = nurses.map((nurse, index) => {
		return (
			<option key={index} value={nurse.nurse_id} defaultValue={index === 0 ? true : false}>
				{nurse.nurse_name}
			</option>
		);
	});

	function renderNurses() {
		if (availableJobs.length > 0 && availableJobs[0].nurse_id == nurse) {
			return (
				<>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'job_id' + selectedNurse.nurse_id}
					>
						<span className='text_big'>{selectedNurse.nurse_id}</span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'facility_id' + selectedNurse.nurse_name}
					>
						<span className='text_big'>{selectedNurse.nurse_name} </span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'nurse_type_needed' + selectedNurse.nurse_type}
					>
						<span className='text_big'>{selectedNurse.nurse_type} </span>
					</div>
					<div
						className='col border bg-light d-flex justify-content-center align-items-center border_div'
						key={'total_number_nurses_needed' + availableJobs[0].available_jobs}
					>
						<span className='text_big'>{availableJobs[0].available_jobs} </span>
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
					<h4>Hiring Availability per Nurse</h4>
				</div>
			</div>
			<div className='row px-3 my-3'>
				<div className='col px-0'>
					<select onChange={setJobValue} id='inputState' className='form-select'>
						{selectNurse}
					</select>
				</div>
				<div className='col'>
					<button onClick={getAllData} className='btn btn-success'>
						Submit
					</button>
				</div>
				<div className='row px-3 my-2 gap-3'>{renderNurses()}</div>
			</div>
		</>
	);
}

export default Q4;
