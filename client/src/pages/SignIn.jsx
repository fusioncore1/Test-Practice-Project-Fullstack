// external libraries/packages/modules:
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
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

	// submit function:
	const onSubmit = (data) => {
		try {
			const { email, password } = data;
		} catch (error) {
			console.error(error);

			// keep the form values so user can retry
		}
	}

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
				{/* Add show-hide or eye button in password field to show or hide password */}
				{/* {errors.password && <p>Password is required</p>} <br /> */}
				<p>{errors.password?.message}</p>

				<input type="submit" value="Submit" /> <br />

				<a href="">Continue with Google</a> <br />
				<a href="">Continue with Apple</a> <br />
			</form>
		</>
	);
}

// exporting sign-in component:
export default SignIn;