import { Router } from 'express';
import CheckBankSlipService from '../services/check-bank-slip.service';

const bankSlipRoutes = Router();

bankSlipRoutes.get('/validate/:bank_slip_code', (request, response) => {
	const checkBankSlip = new CheckBankSlipService();
	checkBankSlip.run(request.body);
	return response.json({ message: 'hello world' });
});

export default bankSlipRoutes;
