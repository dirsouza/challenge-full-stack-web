import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validCpf } from 'Infrastructure/utils';

@ValidatorConstraint({ name: 'CPF', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return validCpf(cpf);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${ validationArguments.property } reported is invalid`;
  }
}
