import { InvalidParamError } from '../presentation/errors/invalid-param.error';

interface Info {
	dueDate?: string;
	value?: number;
	barCode: string;
}

class BankBillet {
	private content: string;
	private dueDate?: string;
	private value: number;
	private barCode: string;

	private baseDate = new Date(1997, 9, 7);

	constructor(content: string) {
		this.content = content;

		this.checkHasContent();
		this.checkIsNumber();
		this.checkLength();

		this.checkFields();
		this.checkDueDate();
		this.checkValue();
		this.transformIntoBarCode();
	}

	public getDueDate(): string | undefined {
		return this.dueDate;
	}

	checkDueDate(): void {
		const dueFactor = Number(this.content.slice(33, 37));

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

	checkFields(): void {
		const { content } = this;

		const firstField = content.slice(0, 9);
		const firstVerifyingDigit = content.slice(9, 10);
		const secondField = content.slice(10, 20);
		const secondVerifyingDigit = content.slice(20, 21);
		const thirdField = content.slice(21, 31);
		const thirdVerifyingDigit = content.slice(31, 32);

		if (Number(firstVerifyingDigit) !== this.checkDigit(firstField)) {
			throw new InvalidParamError('billet_code', 'Código inválido');
		}
		if (Number(secondVerifyingDigit) !== this.checkDigit(secondField)) {
			throw new InvalidParamError('billet_code', 'Código inválido');
		}
		if (Number(thirdVerifyingDigit) !== this.checkDigit(thirdField)) {
			throw new InvalidParamError('billet_code', 'Código inválido');
		}
	}

	checkDigit(field: string): number {
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
	}

	checkIsNumber(): void {
		if (isNaN(Number(this.content))) {
			throw new InvalidParamError(
				'billet_code',
				'Código deve conter apenas números',
			);
		}
	}

	checkHasContent(): void {
		if (!this.content) {
			throw new InvalidParamError('billet_code', 'Parâmetro obrigatório');
		}
	}

	checkLength(): void {
		if (this.content.length !== 47) {
			throw new InvalidParamError('billet_code', 'Código incorreto');
		}
	}

	checkValue(): void {
		let value: string | number = Number(this.content.slice(37, 47)).toString();
		const decimals = value.substr(value.length - 2, value.length);
		const rest = value.substr(0, value.length - 2);
		value = Number(parseFloat([rest, decimals].join('.')).toFixed(2));
		this.value = value;
	}

	transformIntoBarCode(): void {
		const { content } = this;
		let barCode = content.slice(0, 3); // Código do Banco
		barCode += content.slice(3, 4); // Código da Moeda
		barCode += content.slice(33, 37); // Digito Verificador do código de barras
		barCode += content.slice(37, 47); // 9-18		10
		barCode += content.slice(4, 9); // 18-23		5
		barCode += content.slice(10, 20); // 23-32	9
		barCode += content.slice(21, 31); // 32-42	10

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
		const verifyingDigit =
			subtraction === 0 || subtraction === 10 || subtraction === 11
				? 1
				: subtraction;

		this.barCode = barCode.substr(0, 4) + verifyingDigit + barCode.substr(4);

		if (verifyingDigit !== Number(content.slice(32, 33))) {
			throw new InvalidParamError(
				'billet_code',
				`Dígito verificador ${content.slice(
					32,
					33,
				)} inválido, o correto é ${verifyingDigit}`,
			);
		}
	}

	getBilletInfo(): Info {
		return {
			value: this.value,
			barCode: this.barCode,
			dueDate: this.dueDate,
		};
	}
}

export default BankBillet;
