import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
	//state
	const [facilities, setFacilities] = useState([]);
	const [facility, setFacility] = useState('');
	const [mostHiredNurse, setMostHiredNurse] = useState({});

	// render fire
	useEffect(() => {
		async function getData() {
			const resList = await axios.get('http://localhost:3000/facilities/list');
			setFacilities(resList.data);
			setFacility(resList.data[0].facility_id);
		}
		getData();
	}, []);

	// getters
	function getScores(e) {
		e.preventDefault();
		async function fetchScores() {
			try {
				const resList = await axios.get('http://localhost:3000/facilities/most_hired_nurse/' + facility);
				setMostHiredNurse(resList.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchScores();
	}

	//setters
	async function setFacilityValue(e) {
		setFacility(e.target.value);
	}

	//render functions
	const options = facilities.map((facility, index) => {
		return (
			<option key={index} value={facility.facility_id} defaultValue={index === 0 ? true : false}>
				{facility.facility_name}
			</option>
		);
	});

	function renderMostHired() {
		if (mostHiredNurse) {
			return (
				<div className='col border bg-light d-flex justify-content-center align-items-center border_div'>
					<span className='text_big'>{mostHiredNurse.nurse_name}</span>
				</div>
			);
		} else {
			return (
				<div className='col border bg-light d-flex justify-content-center align-items-center border_div'>
					<span className='text_big'>No data</span>
				</div>
			);
		}
	}

	// Main JSX
	return (
		<form className='py-2'>
			<div className='row px-3 my-3'>
				<div className='col'>
					<h4>Most Hired Nurse by Facility</h4>
				</div>
			</div>
			<div className='row px-3 my-3'>
				<div className='col px-0'>
					<select onChange={setFacilityValue} id='inputState' className='form-select'>
						{options}
					</select>
				</div>
				<div className='col'>
					<button onClick={getScores} className='btn btn-success'>
						Submit
					</button>
				</div>
			</div>
			<div className='row px-3 gap-3'>{renderMostHired()}</div>
		</form>
	);
}

export default Form;
