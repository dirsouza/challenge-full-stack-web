import { ValueTransformer } from 'typeorm';
import { isCPF } from 'brazilian-values';

export const transformerCpf: ValueTransformer = {
  from: (cpf: string) => {
    if (cpf.length === 11) return cpf;
    return cpf.replace(/[^\d]+/g, '');
  },
  to: (cpf: string) => cpf,
}

export const validCpf = (cpf: string): boolean => isCPF(cpf);
