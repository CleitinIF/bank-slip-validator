import Validation from '../../presentation/protocols/validate';
import { InvalidParamError } from '../../presentation/errors/invalid-param.error';

class FieldNumberValidation implements Validation {
	constructor(private readonly field_name: string) {}

	validate(value: string): Error | void {
		if (isNaN(Number(value))) {
			return new InvalidParamError(
				this.field_name,
				'Campo deve conter apenas números!',
			);
		}
	}
}

export default FieldNumberValidation;
