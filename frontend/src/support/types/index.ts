export interface IStudent {
  id: number;
  name: string;
  email: string;
  ra: number;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export type TStudentCreate = Partial<Pick<IStudent, 'name' | 'email' | 'ra' | 'cpf'>>;
export type TStudentUpdate = Partial<Pick<IStudent, 'name' | 'email'>>;
