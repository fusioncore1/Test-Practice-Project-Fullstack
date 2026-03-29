const validateData = (schema) => {

	// getting data from request body:
	const data = req.body;

	return async (req, res, next) => {
		try {

			// validating data:
			const validatedData = await schema.validateAsync(data);

			// getting validated data in request object:
			req.validated = validatedData;

			// calling in next middleware:
			next()
		} catch (error) {
			next(error);
		}
	}
}

export default validateData;