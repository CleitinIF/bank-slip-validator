export interface BankSlipValidator {
	isValid: (bank_slip_code: string) => boolean;
}
