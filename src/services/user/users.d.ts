export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber?: string;
}

export type RegisterUserValidation = IRegisterUser & { repeatPassword };
