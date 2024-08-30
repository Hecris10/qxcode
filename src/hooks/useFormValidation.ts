"use server";
import { redirect } from "next/navigation";

export interface FormValidation<T extends Record<string, any>> {
  requiredFields?: Array<keyof T>;
}

export const useFormValidation = <T extends Record<string, any>>({
  requiredFields = [],
  currentUrl = "",
  onSubmit,
}: FormValidation<T> & {
  onSubmit: (data: T) => Promise<void>;
  currentUrl: string;
}) => {
  const errors = {} as Record<keyof T, string>;

  const validate = (data: T) => {
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = "required";
      }
    });

    if (Object.keys(errors).length > 0) {
      const searchParams = new URLSearchParams();
      searchParams.set("errors", JSON.stringify(errors));
      return redirect("/home" + "?" + searchParams.toString());
    }

    return onSubmit(data);
  };

  return { validate, errors };
};
