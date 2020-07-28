import { Router } from 'express';

const bankSlipRoutes = Router();

bankSlipRoutes.get('/validate/:bank_slip_code', (request, response) => {
	return response.json({ message: 'hello world' });
});

export default bankSlipRoutes;
