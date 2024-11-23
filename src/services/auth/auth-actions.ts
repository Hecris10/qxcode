"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ValidationConfig } from "~/utils/server/validate-url-form-server";
import { getFormDataObject } from "~/utils/validation/get-form-data-object";
import { validateEmail } from "~/utils/validation/validate-email";
import { validateFormData } from "~/utils/validation/validate-form-data";
import { apiUrl } from "../api";
import { ILoginRequest, ILoginUser } from "./auth";

const loginUserValidationConfig: ValidationConfig<ILoginUser> = {
  requiredFields: ["email", "password"],
  customValidations: {
    email: (values) => (validateEmail(values.email) ? null : "Invalid"),
  },
};

export const loginUserAction = async (
  //   initialState: ServerRequest<ILoginUser>,
  e: FormData
) => {
  const cookieStore = await cookies();
  const { validationErrors, hasErrors } = validateFormData<ILoginUser>({
    formData: e,
    validationConfig: loginUserValidationConfig,
  });

  if (hasErrors) {
    return validationErrors;
  }

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        getFormDataObject<ILoginUser>(e, ["email", "password"])
      ),
    });

    if (!response.ok) {
      if (response.status === 401) {
        validationErrors.email = "NotFound";
        return validationErrors;
      }
      validationErrors.serverError = true;
      return validationErrors;
    }

    const data = (await response.json()) as ILoginRequest;
    cookieStore.set({
      name: `${process.env.AUTH_TOKEN_NAME}`,
      value: data.accessToken,
      httpOnly: true,
      path: "/",
    });
    validationErrors.serverSucess = true;
  } catch (e) {
    console.error(e);
    validationErrors.serverError = true;
  }

  if (validationErrors.serverSucess) redirect("/");

  return validationErrors;
};
