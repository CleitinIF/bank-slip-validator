class RequiredValidator {
	public static validate(content?: string): void {
		if (!content) {
			throw new Error(`Informe a linha digitável como parâmetro da rota!`);
		}
	}
}

export default RequiredValidator;
