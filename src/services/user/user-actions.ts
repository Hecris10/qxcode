"use server";

import { formatInputDateToIso } from "~/utils/dates";
import { ValidationConfig } from "~/utils/server/validate-url-form-server";
import { getFormDataObject } from "~/utils/validation/get-form-data-object";
import { validateEmail } from "~/utils/validation/validate-email";
import { validateFormData } from "~/utils/validation/validate-form-data";
import { apiUrl, ServerRequest } from "../api";
import { ISignUpUser, SignUpUserValidation } from "./users";

const signUpUserValidationConfig: ValidationConfig<SignUpUserValidation> = {
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

export const signupUser = async (e: FormData) => {
  const { validationErrors, hasErrors } =
    validateFormData<SignUpUserValidation>({
      formData: e,
      validationConfig: signUpUserValidationConfig,
    });

  if (hasErrors) {
    return validationErrors;
  }

  const errors: ServerRequest<SignUpUserValidation> = validationErrors;

  const bodyRequest = getFormDataObject<ISignUpUser>(e, [
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

    if (!response.ok) {
      if (response.status === 409) {
        const data = await response.json();
        if (data?.message?.includes("email")) errors.email = "AlreadyExists";
        if (data?.message?.includes("phone"))
          errors.phoneNumber = "AlreadyExists";
        errors.hasValidationErrors = true;
        return errors;
      }

      const data = await response.json();
      console.error(data);
      errors.serverError = true;
      return errors;
    }
  } catch (error) {
    console.error(error);
    errors.serverError = true;
    return errors;
  }

  errors.serverSucess = true;
  return errors;
};
