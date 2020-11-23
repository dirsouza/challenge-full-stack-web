import { formatToCPFOrCNPJ } from 'brazilian-values';

const formatCpfOrCnpj = (value: string): string => formatToCPFOrCNPJ(value);

export default formatCpfOrCnpj;
