import { InvalidParamError } from '../presentation/errors/invalid-param.error';

class BankBillet {
	private content: string;
	private dueDate: string | null;

	private baseDate = new Date('10/07/1997');

	constructor(content: string) {
		this.content = content;

		this.checkHasValue();
		this.checkIsNumber();
		this.checkLength();
	}

	public getDueDate() {
		return this.dueDate;
	}

	checkDueDate() {
		const dueFactor = Number(this.content.slice(33, 37));

		if (!dueFactor) return;

		const dueDate = new Date();

		dueDate.setDate(this.baseDate.getDate() + dueFactor);
		this.dueDate = dueDate.toLocaleDateString();
	}

	checkFields() {
		const { content } = this;

		const firstField = content.slice(0, 9);
		const firstVerifyingDigit = content.slice(9, 10);
		const secondField = content.slice(10, 20);
		const secondVerifyingDigit = content.slice(20, 21);
		const thirdField = content.slice(21, 31);
		const thirdVerifyingDigit = content.slice(31, 32);
	}

	checkIsNumber() {
		if (isNaN(Number(this.content))) {
			throw new InvalidParamError(
				'billet_code',
				'Código deve conter apenas números',
			);
		}
	}

	checkHasValue() {
		if (!this.content) {
			throw new InvalidParamError('billet_code', 'Parâmetro obrigatório');
		}
	}

	checkLength() {
		if (this.content.length !== 47) {
			throw new InvalidParamError('billet_code', 'Código incorreto');
		}
	}
}

export default BankBillet;
