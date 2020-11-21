import { ValueTransformer } from 'typeorm';

export const transformerCpf: ValueTransformer = {
  from: (cpf: string) => {
    if (cpf.length === 11) return cpf;
    return cpf.replace(/[^\d]+/g, '');
  },
  to: (cpf: string) => cpf,
}
