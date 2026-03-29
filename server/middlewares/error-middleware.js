const errorHandler = (err, req, res, next) => {
	console.log('Error handling middleware');
	const errStatus = err.statusCode || 500;   // 500 status code for server error
	const errMessage = err.message || 'Something went wrong!';
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMessage,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {}   // no need to show error stack in prod mode
	});
}

export default errorHandler;