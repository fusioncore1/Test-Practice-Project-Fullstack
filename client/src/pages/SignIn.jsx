// external libraries/packages/modules:
import { useForm } from 'react-hook-form';

const SignIn = () => {

	// destructuring variables from hook:
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// submit function:
	const onSubmit = (data) => console.log();   // for now let's just print the data on console

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder='Email' required {...register('email', { required: true, })} />
				{errors.email && <p>Email is required</p>}
				<input placeholder='Password' required {...register('password', { required: true })} />
				{errors.password && <p>Password is required</p>}
				<input type="submit" />
				<a href="">Continue with Google</a>
				<a href="">Continue with Apple</a>
			</form>

			{/* validate the form using joi and react-hook-form */}
		</>
	);
}

export default SignIn;