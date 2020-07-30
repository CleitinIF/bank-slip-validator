export class InvalidParamError extends Error {
	constructor(error_description: string) {
		super(`Boleto inválido. ${error_description}`);
		this.name = 'InvalidParamError';
	}
}
