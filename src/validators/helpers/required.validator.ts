class RequiredValidator {
	public static validate(content?: string): boolean {
		if (!content) return false;
		return true;
	}
}

export default RequiredValidator;
