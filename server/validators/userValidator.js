// external packages/modules/libraries:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
	fullname: Joi.string()
		.trim()
		.min(3)
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
	confirmPassword: Joi.string()
		.alphanum()
		.trim()
		.min(8)
		.valid(Joi.ref('password'))
		.required(),
});

// exporting the validation schema:
export default schema;