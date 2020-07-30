import { Router, Request } from 'express';
import CheckBankSlipService from '../services/check-bank-slip.service';
import DealerShipBillet from '../models/dealership-billet.model';
import BankBillet from '../models/bank-billet.model';

const bankSlipRoutes = Router();

bankSlipRoutes.get(
	'/validate/:bank_slip_code',
	(request: Request<{ bank_slip_code: any }>, response) => {
		const { bank_slip_code } = request.params;
		const model = new BankBillet(bank_slip_code);

		const billetInfo = model.getBilletInfo();

		return response.status(200).json(billetInfo);
	},
);

export default bankSlipRoutes;
