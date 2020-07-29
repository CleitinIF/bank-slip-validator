import RequiredFieldValidation from '../validation/validators/required-field.validation';
import FieldNumberValidation from '../validation/validators/field-number-validation';
import FieldLengthValidation from '../validation/validators/field-length-validation';

const parseBankSlip = (bank_slip_code: string): void => {
	const firstField = bank_slip_code.slice(0, 9);
	const secondField = bank_slip_code.slice(10, 21);
	const thirdyField = bank_slip_code.slice(21, 32);
	const checker_code = bank_slip_code.slice(32, 33);
	const fourthField = bank_slip_code.slice(33, 47);
	console.log(firstField);
	// console.log(secondField);
	// console.log(thirdyField);
	// console.log(checker_code);
	// console.log(fourthField);

	const firstFieldCode = firstField
		.split('')
		.reverse()
		.map((item) => parseInt(item))
		.reduce((prevValue, currentValue, index) => {
			console.log(index % 2);
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
		});
	console.log('Aqui', firstFieldCode);

	// const bank_code = bank_slip_code.slice(0, 3);
	// const currency_code = bank_slip_code.slice(3, 4);
	// const code_verifier = bank_slip_code.slice(4, 5);
	// const payment_factor = bank_slip_code.slice(5, 9);
	// const value = bank_slip_code.slice(9, 19);
	// const free_field = bank_slip_code.slice(19, 44);
	// console.log(bank_code);
	// console.log(currency_code);
	// console.log(code_verifier);

	// const baseDate = new Date('07/10/1997').toLocaleDateString();
	// console.log(baseDate);
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
