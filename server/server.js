// external packages/modules/libraries:
import express from 'express';

// internal packages/modules/libraries:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';

// creating an app object:
const app = express();

// creating constants:
const port = process.env.PORT;

// putting before middlewares to parse the incoming request:
app.use(express.json());

// creating middlewares:
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// error middleware always follows in last to catch any error:
app.use(errorHandler);

// connecting with the db before starting for listening to request:
connectDb();

// server listening for request:
app.listen(port, () => {
	console.log(`Test Practice app listening on address: https://localhost:${port}`);
});