export default interface Validation {
	validate(value?: string): Error | void;
}
