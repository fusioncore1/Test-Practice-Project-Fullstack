// external packages/modules/libraries:
import { useState, useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// internal packages/modules/libraries:
import Navbar from './components/Navbar.jsx';
import './App.css';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Error from './pages/Error.jsx';
import { LoginContext } from './components/ContextProvider/Context.jsx';


function App() {

	// state for data setting for loading state: 
	const [data, setData] = useState(false);

	// context for login:
	const { loginData, setLoginData } = useContext(LoginContext);

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
			console.log('User not valid');
		} else {
			console.log('user verified');
			setLoginData(data);
			history('/dashboard');
		}
	}

	useEffect(() => {
		setTimeout(() => {
			DashboardValid();
			setData(true);
		}, 2000);
	}, []);

	// return (
	// 	<>

	// 		{/* toggle for sign-in and sign-up */}
	// 		{/* <label htmlFor="entryToggle" className="switch">
	// 			<input type="checkbox" />
	// 			<span className="slider"></span>
	// 		</label> */}

	// 		{/* Navbar with logo for sign-in and sign-up */}
	// 		<Navbar />

	// 		<h1>Welcome</h1>
	// 		<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci error impedit quia eligendi magnam quidem necessitatibus cumque rerum repellendus velit.</p>
	// 		{/* <p>SignIn Input box 1: Email</p>
	// 		<p>SignIn Input box 2: Password</p>
	// 		<p>Forgot Password Link</p>
	// 		<p>SignUp Input box 1: Full Name</p>
	// 		<p>SignUp Input box 2: Username (should be unique)</p>
	// 		<p>SignUp Input box 2: Email (should be unique)</p>
	// 		<p>SignUp Input box 3: Password (min 6 chars)</p>
	// 		<p>SignUp Input box 4: Confirm Password (match password field)</p>
	// 		<button>SignIn / SignUp</button>
	// 		<a href="">Continue with Google</a>
	// 		<a href="">Continue with Apple</a> */}

	// 		{/* Creating this for temporary purpose: */}
	// 		{/* <SignIn /> */}
	// 		{/* <SignUp /> */}
	// 		{/* Till here it will be temporary */}

	// 		{/* Routes for Navbar */}
	// 		<Routes>
	// 			<Route path='/' element={<SignIn />} />    {/* Home Page */}
	// 			<Route path='/sign-in' element={<SignIn />} />
	// 			<Route path='/sign-up' element={<SignUp />} />
	// 			<Route path='/dashboard' element={<Dashboard />} />
	// 			<Route path='*' element={<Error />} />
	// 			{/* '*' symbol above indicates all in file path */}
	// 		</Routes>
	// 	</>
	// )

	return (
		<>
			{
				data ? (
					<>
						{/* Navbar with logo for sign-in and sign-up */}
						< Navbar />

						<h1>Welcome</h1>
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci error impedit quia eligendi magnam quidem necessitatibus cumque rerum repellendus velit.</p>

						{/* Routes for Navbar */}
						<Routes>
							<Route path='/' element={<SignIn />} />    {/* Home Page */}
							<Route path='/sign-in' element={<SignIn />} />
							<Route path='/sign-up' element={<SignUp />} />
							<Route path='/dashboard' element={<Dashboard />} />
							<Route path='*' element={<Error />} />
							{/* '*' symbol above indicates all in file path */}
						</Routes>
					</>
				)
					:
					(
						// loading effect:		
						<Box sx={{ display: 'flex' }}>
							<CircularProgress aria-label="Loading…" />
						</Box>
					)
			}
		</>
	);
}

export default App;
