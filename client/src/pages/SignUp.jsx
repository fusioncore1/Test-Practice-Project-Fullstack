// external libraries/packages/modules:
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// creating validation schema:
const schema = Joi.object({
	fullname: Joi.string()
		.min(3)
		.trim()
		.required(),
	username: Joi.string()
		.trim()
		.required(),
	email: Joi.string()
		.email()
		.trim()
		.lowercase()
		.required(),
	password: Joi.string()
		.alphanum()
		.trim()
		.min(8)
		.required(),
	confirm_password: Joi.string()
		.alphanum()
		.trim()
		.min(8)
		.valid(Joi.ref('password'))
		.required(),
});

// creating the sign-up component:
const SignUp = () => {

	// default values to reset the form:
	const defaultValues = {
		fullname: '',
		username: '',
		email: '',
		password: '',
		confirm_password: '',
	};

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState,         // use this one for reset
		// formState: { errors },   // this is equivalent to `{ errors } = formState;` separately if you only write `formState` here instead
		formState: {
			errors,
			isSubmitSuccessful,
		},   // similar to what just we did above
		reset,
	} = useForm({
		mode: 'onSubmit',
		resolver: joiResolver(schema),
		defaultValues,   // `defaultValues: defaultValues` this object will determine the form's default state after sending data
	});

	// state variable to show or hide password:
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);

	// state variable to handle form data:
	const [user, setUser] = useState(null);

	// submit function:
	const onSubmit = async (data) => {
		try {
			const { fullname, username, email, password, confirm_password } = data;

			const response = await fetch('/api/users/sign-up', {   // original was: `/users/sign-up` here ('/api' is a key to find url and will be replaced)
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fullname, username, email, password, confirmPassword: confirm_password,
				}),
			});

			const res = await response.json();

			if (response.ok) {
				alert("User Registered Successfully");

				// setting user state:
				setUser(res.data);
			}

			// setIsSubmitSuccessful(true);
		} catch (error) {
			console.error(error);

			// keep form values so user can retry
		}
	}

	// all effects should be put in last just before `return`:
	// resetting the form data in useEffect:
	useEffect(() => {
		if (isSubmitSuccessful && user) {   // we already destructured `isSubmitSuccessful` like we discussed above
			// resetting the values:
			reset(defaultValues);

			// resetting user values:
			setUser(null);
		}
	}, [formState, isSubmitSuccessful, user, reset]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='text' placeholder='Full Name' required {...register('fullname', { required: true })} /> <br />
				{/* {errors.full_name && <p>Full Name is required</p>} <br /> */}
				<p>{errors.fullname?.message}</p>

				<input type='text' placeholder='Username (should be unique)' required {...register('username', { required: true })} /> <br />
				{/* {errors.username && <p>Username is required</p>} <br /> */}
				<p>{errors.username?.message}</p>

				<input type='email' placeholder='Email' required {...register('email', { required: true })} /> <br />
				{/* {errors.email && <p>Email is required</p>} <br /> */}
				<p>{errors.email?.message}</p>

				<div className='passwordField'>
					<input type={!showPass ? 'password' : 'text'} placeholder='Password (min 8 characters)' required {...register('password', { required: true })} /> <br />
					<div className='showpass' onClick={() => setShowPass(!showPass)}>
						{!showPass ? 'Show' : 'Hide'}   {/* You can put an eye icon here */}
					</div>
				</div>
				{/* {errors.password && <p>Password is required</p>} <br /> */}
				<p>{errors.password?.message}</p>

				<div className='passwordField'>
					<input type={!showConfirmPass ? 'password' : 'text'} placeholder='Confirm your password' required {...register('confirm_password', { required: true })} /> <br />
					<div className='showpass' onClick={() => setShowConfirmPass(!showConfirmPass)}>
						{!showConfirmPass ? 'Show' : 'Hide'}
					</div>
				</div>
				{/* {errors.confirm_password && <p>Confirm Your Password!</p>} <br /> */}
				<p>{errors.confirm_password?.message}</p>

				{/* Add show-hide or eye button in password field to show or hide password. Add in both password and confirm-password. */}
				{/* The show and hide button is added, just it's not eye icon. And both are updating simultanously which is wrong. */}
				<input type="submit" value="Submit" /> <br />

				<a href="">Continue with Google</a> <br />
				<a href="">Continue with Apple</a> <br />
			</form>
		</>
	);

}

// exporting sign-up component:
export default SignUp;