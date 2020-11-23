/* eslint-disable */
import { ValidationRuleSchema } from 'vee-validate/dist/types/types';
import { isCPF } from 'brazilian-values';

export default {
  validate: (value: string) => isCPF(value),
  message: 'O número de CPF informado é inválido',
} as ValidationRuleSchema;
