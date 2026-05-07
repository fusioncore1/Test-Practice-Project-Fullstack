// external packages/libraries/modules:
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// internal packages/libraries/modules:
import { LoginContext } from '../components/ContextProvider/Context.jsx';

const Dashboard = () => {

	// Context for login:
	const { loginData, setLoginData } = useContext(LoginContext);

	// state for data setting for loading state: 
	const [data, setData] = useState(false);

	// history function for page navigation:
	const history = useNavigate();

	// defining a dashboard function:
	const DashboardValid = async () => {
		let token = localStorage.getItem('userDataToken');

		const res = await fetch('/api/users/valid-user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			}
		});

		// const data = await res.send();
		const data = await res.json();   // idk why are we using this here, it's empty

		if (data.status === 401 || !data) {
			history('*');
		} else {
			console.log('user verified');
			setLoginData(data);
			history('/dashboard');
		}
	}

	// useEffect(() => {
	// 	DashboardValid();
	// }, []);

	useEffect(() => {
		setTimeout(() => {
			DashboardValid();
			setData(true);
		}, 2000);
	}, []);

	return (
		<>
			{
				data ? (
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<img src="man-user-circle-icon.png" alt="Personal dashboard image" style={{ width: "200px", marginTop: 20 }} />
						<h1>User Email: {loginData ? loginData?.data?.email : ''}</h1>
					</div>
				) : (
					// loading effect:
					<Box sx={{ display: 'flex' }}>
						<CircularProgress aria-label="Loading…" />
					</Box>
				)
			}
		</>
	);
}

export default Dashboard;