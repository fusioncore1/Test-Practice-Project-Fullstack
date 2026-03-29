// external libraries/packages/modules:
import React from 'react';
import { NavLink } from 'react-router';

// internal modules/packages:
import '../App.css';

// creating the navbar functional component:
const Navbar = () => {

	return (
		<>
			<nav className='navbar'>
				<div className='navbar-center'>
					<ul className='nav-links'>
						<li>
							<NavLink to="/sign-in">Sign-In</NavLink>
						</li>
						<li>
							<NavLink to="/sign-up">Sign-Up</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

// exporting the navbar functional component:
export default Navbar;