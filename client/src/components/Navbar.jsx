// external libraries/packages/modules:
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';

// internal modules/packages:
import '../App.css';
import { LoginContext } from '../components/ContextProvider/Context.jsx';

// creating the navbar functional component:
const Navbar = () => {

	const { loginData, setLoginData } = useContext(LoginContext);

	// history function for page navigation:
	const history = useNavigate();

	const logoutUser = async () => {
		let token = localStorage.getItem('userDataToken');

		const res = await fetch('/api/users/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
				'Accept': 'application/json',
			},
			credentials: 'include'
		});

		// const data = await res.send();
		const data = await res.json();   // idk why are we using this here, it's empty

		// if (data.status === 201) {
		if (data.success === true) {   // this is more understandable
			console.log('Logged out successfully');
			localStorage.removeItem('userDataToken');
			setLoginData(false);
			history('/');
		} else {
			console.log('Error');
		}
	}

	return (
		<>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=logout" />
			<header>
				{/* Main logo */}
				<div>
					<img className='logo' src="./stark-industries-svg.svg" alt="company logo" height={200} width={250} />
				</div>
				<nav className='navbar'>
					<div className='navbar-center'>
						<ul className='nav-links'>
							<li>
								<NavLink to="/sign-in">Sign-In</NavLink>
							</li>
							<li>
								<NavLink to="/sign-up">Sign-Up</NavLink>
							</li>

							{/* If you think we need to add a something else here, do so */}
						</ul>
						<br /><br />
						<button onClick={() => {
							logoutUser();
						}}>
							<span className="material-symbols-outlined logout">
								logout
							</span>
						</button>
					</div>
				</nav>
			</header>
		</>
	);
}

// exporting the navbar functional component:
export default Navbar;