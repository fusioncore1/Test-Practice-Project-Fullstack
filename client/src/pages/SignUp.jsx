// external libraries/packages/modules:
import { useForm } from 'react-hook-form';

const SignUp = () => {

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// submit function:
	const onSubmit = (data) => console.log();   // let's just print data for now

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder='Full Name' required {...register('fullname', { required: true })} />
				{errors.fullName && <p>Full Name is required</p>}
				<input placeholder='Username (should be unique)' required {...register('username', { required: true })} />
				{errors.username && <p>Username is required</p>}
				<input placeholder='Email' required {...register('email', { required: true })} />
				{errors.email && <p>Email is required</p>}
				<input placeholder='Password (min 8 characters)' required {...register('password', { required: true })} />
				{errors.password && <p>Password is required</p>}
				<input placeholder='Confirm your password' required {...register('confirm_password', { required: true })} />
				{errors.confirmPassword && <p>Confirm Your Password!</p>}
				<input type="submit" />
				<a href="">Continue with Google</a>
				<a href="">Continue with Apple</a>
			</form>

			{/* validate the form using joi and react-hook-form */}
		</>
	);

}

export default SignUp;