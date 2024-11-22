"use server";

import { formatInputDateToIso } from "~/utils/dates";
import { ValidationConfig } from "~/utils/server/validate-url-form-server";
import { getFormDataObject } from "~/utils/validation/get-form-data-object";
import { validateEmail } from "~/utils/validation/validate-email";
import { validateFormData } from "~/utils/validation/validate-form-data";
import { apiUrl, ServerRequest } from "../api";
import { IRegisterUser, RegisterUserValidation } from "./users";

// export const signupUser = (data: IRegisterUser) =>
//   fetch(`${apiUrl}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

const signUpUserValidationConfig: ValidationConfig<RegisterUserValidation> = {
  requiredFields: [
    "name",
    "email",
    "dateOfBirth",
    "password",
    "repeatPassword",
    "phoneNumber",
  ],
  customValidations: {
    repeatPassword: (values) =>
      values.password !== values.repeatPassword ? "NoMatch" : null,
    email: (values) => (validateEmail(values.email) ? null : "Invalid"),
  },
};

export const signupUser = async (
  initialState: ServerRequest<RegisterUserValidation>,
  e: FormData
) => {
  const { validationErrors, hasErrors } =
    validateFormData<RegisterUserValidation>({
      formData: e,
      validationConfig: signUpUserValidationConfig,
    });

  if (hasErrors) {
    return validationErrors;
  }

  const errors: ServerRequest<RegisterUserValidation> = validationErrors;

  const bodyRequest = getFormDataObject<IRegisterUser>(e, [
    "name",
    "email",
    "dateOfBirth",
    "password",
    "phoneNumber",
  ]);

  bodyRequest.dateOfBirth = formatInputDateToIso(bodyRequest.dateOfBirth);

  try {
    const response = await fetch(`${apiUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
    const data = await response.json();
    console.log({ e, response, data });
  } catch (error) {
    console.error(error);
    errors.serverError = true;
  }

  return errors;
};
