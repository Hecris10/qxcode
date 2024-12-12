"use server";

import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ValidationConfig } from "~/utils/server/validate-url-form-server";
import { getFormDataObject } from "~/utils/validation/get-form-data-object";
import { validateEmail } from "~/utils/validation/validate-email";
import { validateFormData } from "~/utils/validation/validate-form-data";
import { apiUrl } from "../api/api";
import { ILoginRequest, ILoginUser, IsUserAuth, UserAuth } from "./auth";

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
      value: `${data.accessToken}`,
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

export async function logOutUserAction() {
  const cookiesStore = await cookies();
  try {
    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
  }
  cookiesStore.set({
    name: `${process.env.AUTH_TOKEN_NAME}`,
    value: "",
    httpOnly: true,
    path: "/",
  });
  cookiesStore.set({
    name: `${process.env.QX_CODE_VIEW_MODE}`,
    value: "",
  });

  cookiesStore.delete(`${process.env.AUTH_TOKEN_NAME}`);
  cookiesStore.delete(`${process.env.QX_CODE_VIEW_MODE}`);
  redirect("/");
}

export async function isUserLoggedIn(): Promise<IsUserAuth> {
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get(`${process.env.AUTH_TOKEN_NAME}`);
  const accessToken = authCookie?.value;

  if (!accessToken || accessToken === "") return { isAuth: false };
  const secretToken = `${process.env.JWT_SECRET}`;

  try {
    const decodeUser = jwt.verify(
      accessToken,
      secretToken
    ) as unknown as UserAuth;
    if (decodeUser)
      return {
        isAuth: true,
        user: decodeUser,
      };

    return { isAuth: false };
  } catch (err) {
    console.error(err);
    return { isAuth: false };
  }
}
