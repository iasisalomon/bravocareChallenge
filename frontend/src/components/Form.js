import React, { Component } from 'react';

export class Form extends Component {
	render() {
		return (
			<form>
				<div className='row my-2'>
					<div className='col'>
						<input type='text' className='form-control' placeholder='First name' />
					</div>
				</div>
				<div className='row my-2'>
					<div className='col'>
						<select id='inputState' class='form-select'>
							<option selected>Choose...</option>
							<option>...</option>
						</select>
					</div>
				</div>
				<div className='row my-2'>
					<div className='col'>
						<button className='btn btn-success'>Submit</button>
					</div>
				</div>
			</form>
		);
	}
}

export default Form;
