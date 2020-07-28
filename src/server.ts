import express from 'express';
import './config/dotenv';
import routes from './routes';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
