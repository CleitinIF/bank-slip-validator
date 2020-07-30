export class LengthValidator {
	public static validate(content: string, length: number | number[]): void {
		if (Array.isArray(length) && !length.includes(content.length)) {
			throw new Error(
				`A linha digitável deve ter ${length.map((item, index) =>
					index === length.length - 1 ? ` ou ${item}` : `${item}`,
				)} caracteres`,
			);
		} else if (Number(length) && content.length !== Number(length)) {
			throw new Error(`A linha digitável deve ter ${length} caracteres`);
		}
	}
}
