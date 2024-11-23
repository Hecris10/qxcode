export interface ISignUpUser {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber?: string;
}

export type SignUpUserValidation = ISignUpUser & { repeatPassword };
