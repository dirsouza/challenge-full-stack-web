const removeFormatNumber = (value: string): string => value.toString().replace(/[^\d]+/g, '');

export default removeFormatNumber;
