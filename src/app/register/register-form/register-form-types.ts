import { RequestBody } from "~/app/api/user/route";

export interface RegisterForm extends RequestBody {
  repeatPassword: string;
}
