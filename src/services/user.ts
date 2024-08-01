import { RegisterForm } from "~/app/register/register-form/register-form-types";

export const registerUser = (data: RegisterForm) =>
  fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
