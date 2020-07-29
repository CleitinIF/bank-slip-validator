import { InvalidParamError } from '../../presentation/errors/invalid-param.error';

class RequiredFieldValidation {
	constructor(private readonly field_name: string) {}

	validate(value?: string): Error | void {
		if (!value) {
			throw new InvalidParamError(this.field_name, 'Campo obrigatório!');
		}
	}
}

export default RequiredFieldValidation;
