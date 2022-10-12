import React from 'react';
import Form from './components/Form/Form';
import Q4 from './components/Q4/Q4';
import Q5 from './components/Q5/Q5';
import Q6 from './components/Q6/Q6';

import './app.css';

function App() {
	return (
		<div className='container g-0 background_general'>
			<Form />
			<Q4 />
			<Q5 />
			<Q6 />
		</div>
	);
}

export default App;
