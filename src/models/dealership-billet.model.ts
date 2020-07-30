import { InvalidParamError } from '../presentation/errors/invalid-param.error';

class DealerShipBillet {
	private content: string;
	private dueDate: string | null;

	private baseDate = new Date('10/07/1997');

	constructor(content: string) {
		this.content = content;

		this.checkValue();
		this.checkLength();
	}

	public getDueDate() {
		return this.dueDate;
	}

	checkDueDate() {
		const paymentFactor = Number(this.content.slice(33, 37));

		if (!paymentFactor) return;

		const dueDate = new Date();

		dueDate.setDate(this.baseDate.getDate() + paymentFactor);
		this.dueDate = dueDate.toLocaleDateString();
	}

	checkDigits() {}

	checkValue() {
		if (!this.content) {
			throw new InvalidParamError('billet_code', 'Parâmetro obrigatório');
		}
	}

	checkLength() {
		if (this.content.length !== 44) {
			throw new InvalidParamError('billet_code', 'Código incorreto');
		}
	}
}

export default DealerShipBillet;
