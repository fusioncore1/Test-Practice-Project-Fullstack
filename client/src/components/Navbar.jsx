// external libraries/packages/modules:
import React from 'react';
import { NavLink } from 'react-router';

// internal modules/packages:
import '../App.css';

// creating the navbar functional component:
const Navbar = () => {

	return (
		<>
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
					</div>
				</nav>
			</header>
		</>
	);
}

// exporting the navbar functional component:
export default Navbar;