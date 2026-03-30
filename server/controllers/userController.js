// internal libraries/packages/modules:
import User from '../models/userModel.js';

// controller function to sign-up/register user:
const signUpUser = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = { fullname: data.fullname, username: data.username, email: data.email };

		// checking if the user already exists or not
		const userExists = await User.find(uniqueData);

		// if user doesn't exist, we will create data, else we will return function:
		if (!userExists) {
			// creating the data:
			const user = new User(data);

			// saving the data into db (db operations are always in async-await):
			await user.save();
		} else {
			return res.status(409).send({   // 409 is the status code for data confliction
				message: 'User already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({   // 201 is the status code for proper data
			data: data,
			message: 'User registered successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to sign-in/login user:
const signInUser = async (req, res, next) => {
	try {

	} catch (error) {
		next(error);
	}
}

// controller function to sign-out/logout user:
const signOutUser = async (req, res, next) => {
	try {

	} catch (error) {
		next(error);
	}
}

// controller function to get all users:
const getAllUsers = async (req, res, next) => {
	try {
		// getting all the data from users collection or table:
		const getUsers = await User.find();

		// if no users found:
		if (!getUsers) {
			return res.status(404).send({
				message: 'No users found',
				success: false,
			});
		}

		// sending response:
		return res.status(200).send({
			data: getUsers,
			message: 'All users fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get a user by id:
const getUserById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from users table or collection:
		const userById = await User.findById(id);

		// if user not found by id:
		if (!userById) {
			return res.status(404).send({
				message: 'User by id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: userById,
			message: 'User by id found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update a user by id:
const updateUserById = async (req, res, next) => {
	try {
		// getting user id from request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data by id from users collection or table and updating it:
		const updatedUser = await User.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if data not found by id and updated:
		if (!updatedUser) {
			return res.status(404).send({
				message: 'User not updated',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'User updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete a user by id:
const deleteUserById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// gettind data by id from users collection or table and deleting it:
		const deleteUser = await User.findByIdAndDelete(id);

		// if data not found by id and deleted:
		if (!deleteUser) {
			return res.status(404).send({
				message: 'User not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteUser,
			message: 'User deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	signUpUser,
	signInUser,
	signOutUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
}