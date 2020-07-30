import { InvalidParamError } from '../errors/invalid-param.error';
import { LengthValidator } from '../validators/length.validator';
import parseValue from '../utils/parseValue';

interface Info {
	dueDate?: string;
	value?: string;
	barCode: string;
}

class BankBillet {
	private content: string;
	private separatedContent: string[];
	private barCode: string;

	private baseDate = new Date(1997, 9, 7);

	private dueDate?: string;
	private value: string;

	constructor(content: string) {
		this.content = content;

		LengthValidator.validate(this.content, 47);

		this.breakContentIn5();
		this.verifyDigits();
		this.generateBarCode();

		this.findDueDate();
		this.findValue();
	}

	private breakContentIn5(): void {
		const { content } = this;
		this.separatedContent = [
			content.slice(0, 10),
			content.slice(10, 21),
			content.slice(21, 32),
			content.slice(32, 33),
			content.slice(33),
		];
	}

	private verifyDigits() {
		const { separatedContent } = this;
		this.verifyFieldDigit(separatedContent[0]);
		this.verifyFieldDigit(separatedContent[1]);
		this.verifyFieldDigit(separatedContent[2]);
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
		const verifyDigit = subtraction === 10 ? 0 : subtraction;

		if (verifyDigit !== Number(field[field.length - 1])) {
			throw new Error(`Dígito verificador inválido`);
		}
	}

	private generateBarCode(): void {
		const { separatedContent } = this;
		let barCode = separatedContent[0].slice(0, 3);
		barCode += separatedContent[0].slice(3, 4);
		barCode += separatedContent[4].slice(0, 4);
		barCode += separatedContent[4].slice(4, 14);
		barCode += separatedContent[0].slice(4, 9);
		barCode += separatedContent[1].slice(0, 10);
		barCode += separatedContent[2].slice(0, 10);

		const barVerifyDigit = this.verifyBarDigit(barCode);

		if (barVerifyDigit !== Number(separatedContent[3].slice(0))) {
			throw new InvalidParamError(
				`Dígito verificador ${separatedContent[3].slice(
					0,
				)} inválido, o correto é ${barVerifyDigit}`,
			);
		}

		this.barCode = barCode.substr(0, 4) + barVerifyDigit + barCode.substr(4);
	}

	private verifyBarDigit(barCode: string): number {
		let count = 2;
		const sum = barCode
			.split('')
			.reverse()
			.map((number) => parseInt(number))
			.reduce((prevValue, currentValue) => {
				const number = currentValue * count;
				if (count === 9) count = 2;
				else count++;
				return prevValue + number;
			}, 0);

		const subtraction = 11 - (sum % 11);
		const verifyDigit =
			subtraction === 0 || subtraction === 10 || subtraction === 11
				? 1
				: subtraction;

		return verifyDigit;
	}

	public getDueDate(): string | undefined {
		return this.dueDate;
	}

	private findDueDate(): void {
		const dueFactor = Number(this.separatedContent[4].slice(0, 4));

		if (!dueFactor) return;

		const dueDate = this.baseDate;

		dueDate.setDate(dueDate.getDate() + dueFactor);

		const formattedDate = dueDate
			.toISOString()
			.substr(0, 10)
			.split('-')
			.reverse()
			.join('/');

		this.dueDate = formattedDate;
	}

	private findValue(): void {
		const value: string | number = Number(
			this.content.slice(37, 47),
		).toString();
		this.value = parseValue(value);
	}

	public getBilletInfo(): Info {
		return {
			value: this.value,
			barCode: this.barCode,
			dueDate: this.dueDate,
		};
	}
}

export default BankBillet;
