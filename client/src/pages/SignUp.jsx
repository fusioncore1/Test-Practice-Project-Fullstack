// external libraries/packages/modules:
import { useForm } from 'react-hook-form';
import { useState } from 'react';
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

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: joiResolver(schema),
	});

	// state variable to show or hide password:
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);

	// submit function:
	const onSubmit = async (data) => {

		const { fullname, username, email, password, confirm_password } = data;

		const submitData = await fetch('http://localhost:3000/api/v1/users/sign-up', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				fullname, username, email, password, confirmPassword: confirm_password,
			}),
		});

		// CONTINUE FROM: 2:20:38 MINS

		const res = await submitData.json();
		console.log(res);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder='Full Name' required {...register('fullname', { required: true })} /> <br />
				{/* {errors.full_name && <p>Full Name is required</p>} <br /> */}
				<p>{errors.fullname?.message}</p>

				<input placeholder='Username (should be unique)' required {...register('username', { required: true })} /> <br />
				{/* {errors.username && <p>Username is required</p>} <br /> */}
				<p>{errors.username?.message}</p>

				<input type='email' placeholder='Email' required {...register('email', { required: true })} /> <br />
				{/* {errors.email && <p>Email is required</p>} <br /> */}
				<p>{errors.email?.message}</p>

				<div className='passwordField'>
					<input type={!showPass ? 'password' : 'text'} placeholder='Password (min 8 characters)' required {...register('password', { required: true })} /> <br />
					<div className='showpass' onClick={() => setShowPass(!showPass)}>
						{!showPass ? 'Show' : 'Hide'}
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

			{/* validate the form using joi and react-hook-form */}
		</>
	);

}

// exporting sign-up component:
export default SignUp;