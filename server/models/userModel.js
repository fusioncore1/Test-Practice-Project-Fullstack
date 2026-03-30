// internal packages/libraries/modules:
import { Schema, model } from 'mongoose';

// creating the schema:
const userSchema = new Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	confirmPassword: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const User = model('User', userSchema);

// exporting the model:
export default User;