// external packages/modules/libraries:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
	fullname: Joi.string()
		.min(3)
		.required(),
	username: Joi.string()
		.required(),
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.alphanum()
		.required(),
	confirmPassword: Joi.string()
		.alphanum()
		.valid(Joi.ref('password')),
});

// exporting the validation schema:
export default schema;