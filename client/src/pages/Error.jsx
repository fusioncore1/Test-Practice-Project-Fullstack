// External packages/libraries/modules:
import React from 'react';
import { Link } from 'react-router';

const Error = () => {
	return (
		<>
			<img src="Error404.png" alt="404 Not found" />
			<Link to="/">Back to Home Page</Link>
		</>
	);
}

export default Error;