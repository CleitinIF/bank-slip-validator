const parseValue = (value: string): string => {
	const decimals = value.substr(value.length - 2, value.length);
	const rest = value.substr(0, value.length - 2);
	value = parseFloat([rest, decimals].join('.')).toFixed(2);
	return value;
};

export default parseValue;
