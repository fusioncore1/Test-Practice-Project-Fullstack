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

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
	});

	// state variable to show or hide password:
	const [showPass, setShowPass] = useState(false);

	// submit function:
	const onSubmit = (data) => console.log(data);   // for now let's just print the data on console

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

			{/* validate the form using joi and react-hook-form */}
		</>
	);
}

// exporting sign-in component:
export default SignIn;