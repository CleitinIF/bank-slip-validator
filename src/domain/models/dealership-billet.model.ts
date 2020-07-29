class DealerShipBillet {
	private content: string;
	public dueDate: string | null;

	private baseDate = new Date('10/07/1997');

	constructor(content: string) {
		this.content = content;
	}

	checkDueDate() {
		const paymentFactor = Number(this.content.slice(33, 37));

		if (!paymentFactor) return;

		const dueDate = new Date();

		dueDate.setDate(this.baseDate.getDate() + paymentFactor);
		this.dueDate = dueDate.toLocaleDateString();
	}

	checkDigits() {}

	checkValue() {}
}

export default DealerShipBillet;
