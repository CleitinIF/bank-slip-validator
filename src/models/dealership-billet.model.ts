import { LengthValidator } from '../validators/length.validator';
import { InvalidParamError } from '../errors/invalid-param.error';
import parseValue from '../utils/parseValue';

interface Info {
	dueDate?: string;
	value?: string;
	barCode: string;
}

class DealerShipBillet {
	private content: string;
	private separatedContent: string[];
	private barCode: string;

	private dueDate?: string;
	private value: string;

	constructor(content: string) {
		this.content = content;

		LengthValidator.validate(this.content, 48);

		this.breakContentIn4();
		this.verifyDigits();
		this.generateBarCode();

		this.findDueDate();
		this.findValue();
	}

	private breakContentIn4(): void {
		const { content } = this;
		this.separatedContent = [
			content.slice(0, 12),
			content.slice(12, 24),
			content.slice(24, 36),
			content.slice(36, 48),
		];
	}

	private verifyDigits() {
		const { separatedContent } = this;

		// A representação numérica do Código de Barras, deverá ser montada após o cálculo do dígito verificador.
		this.verifyBarDigit(
			separatedContent[0].slice(0, -1) +
				separatedContent[1].slice(0, -1) +
				separatedContent[2].slice(0, -1) +
				separatedContent[3].slice(0, -1),
		);
		this.verifyFieldDigit(separatedContent[0]);
		this.verifyFieldDigit(separatedContent[1]);
		this.verifyFieldDigit(separatedContent[2]);
		this.verifyFieldDigit(separatedContent[3]);
	}

	private verifyFieldDigit(field: string): void {
		const sum = field
			.split('') // transforma em array
			.slice(0, -1) // remove o ultimo elemento (Dígito verificador)
			.reverse() // inverte o array para multiplicar (2*1*2*1*...)
			.map((item) => parseInt(item)) // transforma a string em um inteiro
			// realiza a multiplicação
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

		const subtraction = 10 - (sum % 10);
		const verifyDigit =
			subtraction === 0 || subtraction === 1
				? 0
				: subtraction === 10
				? 1
				: subtraction;

		if (verifyDigit !== Number(field[field.length - 1])) {
			throw new Error(`Dígito verificador inválido`);
		}
	}

	private generateBarCode(): void {
		const { separatedContent } = this;
		let barCode = separatedContent[0].slice(0, -1);
		barCode += separatedContent[1].slice(0, -1);
		barCode += separatedContent[2].slice(0, -1);
		barCode += separatedContent[3].slice(0, -1);

		this.barCode = barCode;
	}

	private verifyBarDigit(barCode: string): void {
		const originalVerifyDigit = Number(barCode.slice(3, 4));
		const _barCode = barCode.slice(0, 3) + barCode.slice(4);

		const sum = _barCode
			.split('')
			.reverse()
			.map((number) => parseInt(number))
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

		const subtraction = 10 - (sum % 10);
		// const verifyDigit =
		// 	subtraction === 0 || subtraction === 10 || subtraction === 11
		// 		? 1
		// 		: subtraction;

		if (subtraction !== originalVerifyDigit) {
			throw new InvalidParamError(
				`Dígito verificador ${originalVerifyDigit} inválido, o correto é ${subtraction}`,
			);
		}

		// return subtraction;
	}

	private findDueDate(): void {
		const date = this.separatedContent[3].slice(0, 8);

		const day = Number(date.slice(6, 8));
		const month = Number(date.slice(4, 6));
		const year = Number(date.slice(0, 4));

		const dueDate = new Date(year, month, day);
		this.dueDate = dueDate
			.toISOString()
			.substr(0, 10)
			.split('-')
			.reverse()
			.join('/');
	}

	private findValue(): void {
		const valueOfFirstField = this.separatedContent[0].slice(4);
		const valueOfSecondField = this.separatedContent[1].slice(0, 3);

		this.value = parseValue(valueOfFirstField + valueOfSecondField);
	}

	public getBilletInfo(): Info {
		return {
			value: this.value,
			barCode: this.barCode,
			dueDate: this.dueDate,
		};
	}
}

export default DealerShipBillet;
