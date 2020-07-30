class NumberValidator {
	public static validate(content: string): void {
		if (isNaN(Number(content))) {
			throw new Error(`A linha digitável deve conter apenas números!`);
		}
	}
}

export default NumberValidator;
