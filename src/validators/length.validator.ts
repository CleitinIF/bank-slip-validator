class LengthValidator {
	public static validate(content: string, length: number): void {
		if (content.length !== Number(length)) {
			throw new Error(`A linha digitável deve ter ${length} caracteres`);
		}
	}
}

export default LengthValidator;
