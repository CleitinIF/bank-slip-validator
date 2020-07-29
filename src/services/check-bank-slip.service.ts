import RequiredFieldValidation from '../validation/validators/required-field.validation';
import FieldNumberValidation from '../validation/validators/field-number-validation';
import FieldLengthValidation from '../validation/validators/field-length-validation';

const getVerifierCode = (field: string) => {
	const sum = field
		.split('')
		.reverse()
		.map((item) => parseInt(item))
		.reduce((prevValue, currentValue, index) => {
			if (index % 2 === 0) {
				const sum = (Number(currentValue) * 2)
					.toString()
					.split('')
					.map((item) => parseInt(item))
					.reduce((prevValue, currentValue) => prevValue + currentValue);

				return prevValue + sum;
			} else {
				return prevValue + Number(currentValue) * 1;
			}
		}, 0);

	const rest = sum % 10;
	return 10 - rest;
};

const parseBankSlip = (bank_slip_code: string): void => {
	const firstField = bank_slip_code.slice(0, 9);
	const firstVerifyingDigit = bank_slip_code.slice(9, 10);
	const secondField = bank_slip_code.slice(10, 20);
	const secondVerifyingDigit = bank_slip_code.slice(20, 21);
	const thirdField = bank_slip_code.slice(21, 31);
	const thirdVerifyingDigit = bank_slip_code.slice(31, 32);
	const checker_code = bank_slip_code.slice(32, 33);
	const fourthField = bank_slip_code.slice(33, 47);

	if (Number(firstVerifyingDigit) !== getVerifierCode(firstField)) {
	}
	if (Number(secondVerifyingDigit) !== getVerifierCode(secondField)) {
	}
	if (Number(thirdVerifyingDigit) !== getVerifierCode(thirdField)) {
	}

	const payment_factor = bank_slip_code.slice(33, 37); // se for 0000, n existe data de vencimento
	const value = bank_slip_code.slice(37, 47);

	const baseDate = new Date('10/07/1997');
	baseDate.setDate(baseDate.getDate() + Number(payment_factor));

	console.log(baseDate.toLocaleDateString());
};

class CheckBankSlipService {
	public run(bank_slip_code: string): any {
		const requiredError = new RequiredFieldValidation(
			'bank_slip_code',
		).validate(bank_slip_code);
		const isNumberError = new FieldNumberValidation('bank_slip_code').validate(
			bank_slip_code,
		);

		parseBankSlip(bank_slip_code);
	}
}

export default CheckBankSlipService;
