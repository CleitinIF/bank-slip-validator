import RequiredFieldValidation from '../validation/validators/required-field.validation';
import FieldNumberValidation from '../validation/validators/field-number-validation';
import FieldLengthValidation from '../validation/validators/field-length-validation';
import { badRequest } from '../presentation/helpers/http/http.helper';

interface Request {
	bank_slip_code: string;
}

class CheckBankSlipService {
	public async run({ bank_slip_code }: Request): Promise<any> {
		const requiredError = new RequiredFieldValidation(
			'bank_slip_code',
		).validate(bank_slip_code);
		if (requiredError) {
			return badRequest(requiredError);
		}

		const isNumberError = new FieldNumberValidation('bank_slip_code').validate(
			bank_slip_code,
		);
		if (isNumberError) {
			return badRequest(isNumberError);
		}

		const lengthError = new FieldLengthValidation(
			'bank_slip_code',
			44,
		).validate(bank_slip_code);

		if (lengthError) {
			return badRequest(lengthError);
		}
	}
}

export default CheckBankSlipService;
