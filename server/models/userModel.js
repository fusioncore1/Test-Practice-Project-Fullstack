// external packages/libraries/modules:
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// declaring and defining constants:
// jwt private key:
const private_key = process.env.JWT_SECRET_KEY;

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
	// confirmPassword: {
	// 	type: String,
	// 	trim: true,
	// 	minLength: 8,
	// 	required: true,
	// },
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

// We'll hash password using mongoose pre method before saving the data into db:
// Don't use next here, as mongoose handles that thing automatically
userSchema.pre('save', async function (next) {   // `pre()` method works before the specified event happens, which is here 'save' (save to db)
	// Only hash password if it is modified or it is new. Else pass the control to next middleware:
	if (!this.isModified('password')) return;

	try {
		// hasing password:
		this.password = await bcrypt.hash(this.password, 12);   // `this` refers to the current schema here

		// we don't want confirm password to be saved in db:
		this.confirmPassword = undefined;

		// sending call to the next middleware:
		// next();
	} catch (error) {
		// next(error);
		throw error;
	}
});

// token generation:
userSchema.methods.generateAuthToken = async function () {   // a problem somewhere around here
	try {
		// creating the token:
		let tokenCreated = jwt.sign({ _id: this._id }, private_key, { expiresIn: '1d' });

		this.tokens = this.tokens.concat({
			token: tokenCreated,
		});

		// saving the token into the db:
		await this.save();

		// returning the token:
		return tokenCreated;
	} catch (error) {
		console.error('Error while generating token: ', error);
		// throw new Error(error);   // code will be terminated from here
		throw error;   // we can also write this
	}
}

// creating the model:
const User = model('User', userSchema);

// exporting the model:
export default User;