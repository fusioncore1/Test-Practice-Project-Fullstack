const validateData = (schema) => {


	return async (req, res, next) => {
		try {
			// getting data from request body:
			const data = req.body;

			// validating data:
			const validatedData = await schema.validateAsync(data);

			// getting validated data in request object:
			req.validated = validatedData;

			// calling in next middleware:
			next();
		} catch (error) {
			next(error);
		}
	}
}

export default validateData;