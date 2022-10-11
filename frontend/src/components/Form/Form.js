import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
	//state
	const [facilities, setFacilities] = useState([]);
	const [facility, setFacility] = useState('100');
	const [scores, setScores] = useState([]);

	// render fire
	useEffect(() => {
		async function getData() {
			const resList = await axios.get('http://localhost:3000/facilities/list');
			setFacilities(resList.data);
		}
		getData();
	}, []);

	// getters
	function getScores(e) {
		e.preventDefault();
		async function fetchScores() {
			try {
				const resOne = await axios.get(`http://localhost:3000/facilities/score/${facility}`);
				setScores(resOne.data);
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

	function renderScores() {
		if (scores.length > 0) {
			return scores.map((score, index) => {
				return (
					<div className='col border bg-light d-flex justify-content-center align-items-center border_div' key={index}>
						<span className='text_big'>{score.score}</span>
					</div>
				);
			});
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
			<div className='row px-3 gap-3'>{renderScores()}</div>
		</form>
	);
}

export default Form;
