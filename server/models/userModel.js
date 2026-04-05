// external packages/libraries/modules:
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// creating the schema:
const userSchema = new Schema({
	fullname: {
		type: String,
		trim: true,
		required: true,
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
		minLength: 8,
		required: true,
	},
	confirmPassword: {
		type: String,
		trim: true,
		minLength: 8,
		required: true,
	},
	// A field for JWT tokens:
	tokens: [
		{
			token: {
				type: String,
				required: true,
			}
		}
	],
}, { timestamps: true });

// we'll hash password using mongoose pre method before saving the data into db:
userSchema.pre('save', async (next) => {   // `pre()` method works before the specified event happens, which is here 'save' (save to db)

	// hashing both password and confirmPassword:
	this.password = await bcrypt.hash(this.password, 20);   // `this` refers to the current schema here
	this.confirmPassword = await bcrypt.hash(this.confirmPassword, 20);

	next();   // call to the next middleware
});

// creating the model:
const User = model('User', userSchema);

// exporting the model:
export default User;