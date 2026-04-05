// external packages/modules/libraries:
import express from 'express';
import cors from 'cors';

// internal packages/modules/libraries:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';
import routes from './routes/indexRouters.js';

// creating an app object:
const app = express();

// options for CORS:
const corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200
}

// CORS (Cross Origin Resource Sharing) declaration:
// Adding headers: Access-Control-Allow-Origin: [port number or * for all]:
app.use(cors(corsOptions));

// creating constants:
const port = process.env.PORT || 3001;

// putting before middlewares to parse the incoming request:
app.use(express.json());

// creating middlewares:
app.use('/api/v1', routes);

// put this under private in package.json file:
//   "proxy": "http://localhost:3000/api/v1",

// error middleware always follows in last to catch any error:
app.use(errorHandler);

// connecting with the db before starting for listening to request:
connectDb();

// server listening for request:
app.listen(port, () => {
	console.log(`Test Practice app listening on address: https://localhost:${port}`);
});