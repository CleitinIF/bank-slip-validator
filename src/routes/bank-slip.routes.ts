import { Router, Request } from 'express';
import CheckBankSlipService from '../services/check-bank-slip.service';

const bankSlipRoutes = Router();

bankSlipRoutes.get(
	'/validate/:bank_slip_code',
	(request: Request<{ bank_slip_code: any }>, response) => {
		const checkBankSlip = new CheckBankSlipService();
		checkBankSlip.run(request.params.bank_slip_code);
		return response.json({ message: 'hello world' });
	},
);

export default bankSlipRoutes;
