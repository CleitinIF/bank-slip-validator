import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import './config/dotenv';
import routes from './routes';
import ServerError from './errors/server.error';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(routes);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof ServerError) {
			return response.status(500).json({
				status: err.statusCode,
				message: err.message,
			});
		}

		return response.status(400).json({
			status: 'error',
			message: err.message,
		});
	},
);

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
