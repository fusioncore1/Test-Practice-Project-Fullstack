// external libraries/packages/modules:
import mongoose from 'mongoose';

// importing constants:
const mongodb_uri = process.env.MONGODB_URI;

// creating db connection error handling function:
function handleDbConnError(error) {
	console.log('Error while connecting to DB: ${error}');
	console.error(error.message);
	process.exit(1);   // terminating the server program on connection failure
}

// creating the db connection function:
const connectDb = async () => {
	try {
		const conn = await mongoose.connect(mongodb_uri);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		handleDbConnError(error);
	}
}

export default connectDb;