// external libraries/packages/modules:
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router';
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.lowercase()
		.trim(),
	password: Joi.string()
		.alphanum()
		.min(8)
		.required()
		.trim(),
});

// creating the sign-in component:
const SignIn = () => {

	// default values to reset the form:
	const defaultValues = {
		email: '',
		password: '',
	};

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState,   // this one will be for reset
		// formState: { errors },   // this is equivalent to `{ errors } = formState;` especially if you only write `formState` here instead
		formState: {
			errors,
			isSubmitSuccessful,
		},
		reset,
	} = useForm({
		mode: 'onSubmit',
		resolver: joiResolver(schema),
		defaultValues,     // `defaultValues: defaultValues` this object will determine the form's default state after sending data
	});

	// state variable to show or hide password:
	const [showPass, setShowPass] = useState(false);

	// state variable to handle the form data:
	const [user, setUser] = useState(false);

	// history variable for page navigation:
	const history = useNavigate();

	// submit function:
	const onSubmit = async (data) => {
		try {
			// destructuring data from user:
			const { email, password } = data;

			// sending data and getting response:
			const response = await fetch('/api/users/sign-in', {   // `/api` will work as match-maker here, helpful for finding url 
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email, password,
				}),
			});

			const res = await response.json();

			if (response.ok) {
				// alert for login:
				alert('Welcome Back...');

				// setting the cookies in localStorage:
				localStorage.setItem("userDataToken", res.data.token);

				// navigating user to dashboard:
				history('/dashboard');

				// setting user state:
				setUser(res.data);
			}
		} catch (error) {
			console.error(error);

			// keep the form values so user can retry
		}
	}

	// all effects should be put in last just before `return`:
	// resetting form data in useEffect:
	useEffect(() => {
		if (isSubmitSuccessful && user) {   // we already destructured `isSubmitSuccessful` above
			// resetting the values:
			reset(defaultValues);

			// resetting user values:
			setUser(null);
		}
	}, [formState, isSubmitSuccessful, user, reset]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='email' placeholder='Email' required {...register('email', { required: true, })} /> <br />
				{/* {errors.email && <p>Email is required</p>} <br /> */}
				<p>{errors.email?.message}</p>

				<div className='passwordField'>
					<input type={!showPass ? 'password' : 'text'} placeholder='Password' required {...register('password', { required: true })} />
					<div className='showpass' onClick={() => setShowPass(!showPass)}>
						{!showPass ? 'Show' : 'Hide'}   {/* you can put eye-icon here */}
					</div>
					<br />
				</div>
				<p>{errors.password?.message}</p>

				{/* Add show-hide or eye button in password field to show or hide password */}
				{/* {errors.password && <p>Password is required</p>} <br /> */}
				<input type="submit" value="Submit" /> <br />

				<a href="">Continue with Google</a> <br />
				<a href="">Continue with Apple</a> <br />
			</form>
		</>
	);
}

// exporting sign-in component:
export default SignIn;