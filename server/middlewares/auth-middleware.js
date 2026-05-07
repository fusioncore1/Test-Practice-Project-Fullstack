// importing external libraries/modules/packages:
import jwt from 'jsonwebtoken';

// importing internal libraries/modules/packages:
import User from '../models/userModel.js';


// defining constants:
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// USE THIS CODE IF THE BELOW DOESN'T WORK:
const authenticate = async (req, res, next) => {
	try {

		const token = req.headers.authorization;

		const verifyToken = jwt.verify(token, jwtSecretKey);
		const rootUser = await User.findOne({ _id: verifyToken._id });

		if (!rootUser) {
			throw new Error('User not found');
		}

		req.token = token;
		req.rootUser = rootUser;
		req.userId = rootUser._id;

		// calling the next middleware:
		next();
	} catch (error) {
		res.status(401).json({
			status: 401,
			message: 'Unauthorized, no token provided',
			success: false,
			error: error,
		});
	}
}

// // USE THE ABOVE CODE IF THIS ONE DOESN'T WORK (only cookie based):
// const authenticate = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.userCookie;

// 		if (!token) {
// 			return res.status(401).json({
// 				message: 'No token provided',
// 				success: false,
// 			});
// 		}

// 		const verifyToken = jwt.verify(token, jwtSecretKey);
// 		const rootUser = await User.findById(verifyToken._id);

// 		if (!rootUser) {
// 			throw new Error('User not found');
// 		}

// 		req.token = token;
// 		req.rootUser = rootUser;
// 		req.userId = rootUser._id;

// 		// calling the next middleware:
// 		next();
// 	} catch (error) {
// 		res.status(401).json({
// 			message: 'Unauthorized',
// 			success: false,
// 		});
// 	}
// }

export default authenticate;