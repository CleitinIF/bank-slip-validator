import { Router, Request } from 'express';
import DealerShipBillet from '../models/dealership-billet.model';
import BankBillet from '../models/bank-billet.model';
import RequiredValidator from '../validators/required.validator';
import NumberValidator from '../validators/number.validator';

const bankSlipRoutes = Router();

bankSlipRoutes.get(
	'/validate/:billet_code',
	(request: Request<{ billet_code: any }>, response) => {
		const { billet_code } = request.params;

		RequiredValidator.validate(billet_code);
		NumberValidator.validate(billet_code);

		const model =
			billet_code.length === 47
				? new BankBillet(billet_code)
				: new DealerShipBillet(billet_code);

		const billetInfo = model.getBilletInfo();

		return response.status(200).json(billetInfo);
	},
);

export default bankSlipRoutes;
