import { Router, Request } from 'express';
import CheckBankSlipService from '../services/check-bank-slip.service';
import DealerShipBillet from '../models/dealership-billet.model';
import BankBillet from '../models/bank-billet.model';

const bankSlipRoutes = Router();

bankSlipRoutes.get(
	'/validate/:bank_slip_code',
	(request: Request<{ bank_slip_code: any }>, response) => {
		const { bank_slip_code } = request.params;
		const model = new DealerShipBillet(bank_slip_code);

		console.log(model.getDueDate());

		// const checkBankSlip = new CheckBankSlipService();
		// checkBankSlip.run(request.params.bank_slip_code);
		return response.json({ message: 'hello world' });
	},
);

export default bankSlipRoutes;
