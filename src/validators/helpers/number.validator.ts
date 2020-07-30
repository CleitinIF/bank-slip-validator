class NumberValidator {
	public static validate(content: string): boolean {
		if (isNaN(Number(content))) {
			return false;
		}
		return true;
	}
}

export default NumberValidator;
