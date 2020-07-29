import Validation from '../../presentation/protocols/validate';
import { InvalidParamError } from '../../presentation/errors/invalid-param.error';

class FieldLengthValidation implements Validation {
	constructor(
		private readonly field_name: string,
		private readonly length: number,
	) {
		this.field_name = field_name;
		this.length = length;
	}

	validate(value: string): Error | void {
		if (value.length === this.length) {
			return new InvalidParamError(
				this.field_name,
				`Campo deve conter ${this.length} caracteres!`,
			);
		}
	}
}

export default FieldLengthValidation;
