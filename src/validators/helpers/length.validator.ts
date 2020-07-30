export class LengthValidator {
	public static validate(content: string, length: number): boolean {
		if (content.length !== length) {
			return false;
		}
		return true;
	}
}
