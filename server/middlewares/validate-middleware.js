const validateData = (schema) => {

	// getting data from request body:
	const data = req.body

	return async (req, res, next) => {
		await schema.validateAsync(data);
	}
}

export default validateData;