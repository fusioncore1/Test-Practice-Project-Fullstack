// external packages/modules/libraries:
import { Route, Routes } from 'react-router';

// internal packages/modules/libraries:
import Navbar from './components/Navbar.jsx';
import './App.css';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {

	return (
		<>
			{/* Main logo */}
			<div>
				<img src="./stark-industries-svg.svg" alt="company logo" />
			</div>

			{/* toggle for sign-in and sign-up */}
			{/* <label htmlFor="entryToggle" className="switch">
				<input type="checkbox" />
				<span className="slider"></span>
			</label> */}

			{/* Navbar for sign-in and sign-up */}
			<Navbar />

			<h1>Welcome</h1>
			<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci error impedit quia eligendi magnam quidem necessitatibus cumque rerum repellendus velit.</p>
			{/* <p>SignIn Input box 1: Email</p>
			<p>SignIn Input box 2: Password</p>
			<p>Forgot Password Link</p>
			<p>SignUp Input box 1: Full Name</p>
			<p>SignUp Input box 2: Username (should be unique)</p>
			<p>SignUp Input box 2: Email (should be unique)</p>
			<p>SignUp Input box 3: Password (min 6 chars)</p>
			<p>SignUp Input box 4: Confirm Password (match password field)</p>
			<button>SignIn / SignUp</button>
			<a href="">Continue with Google</a>
			<a href="">Continue with Apple</a> */}

			{/* Routes for Navbar */}
			<Routes>
				<Route path='/SignIn' element={SignIn} />
				<Route path='/SignUp' element={SignUp} />
			</Routes>
		</>
	)
}

export default App;
