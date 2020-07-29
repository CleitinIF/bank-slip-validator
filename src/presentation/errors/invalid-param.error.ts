export class InvalidParamError extends Error {
	constructor(param_name: string, error_description: string) {
		super(`Parâmetro inválido: ${param_name}. ${error_description}`);
		this.name = 'InvalidParamError';
	}
}
