import { ServerRequest } from "~/services/api";

type ValidationFunction<T> = (values: T) => string | null;

interface ValidationConfig<T> {
  requiredFields?: (keyof T)[];
  customValidations?: { [key in keyof T]?: ValidationFunction<T> };
}

export const validateFormData = <T>({
  formData,
  validationConfig,
}: {
  formData: FormData;
  validationConfig: ValidationConfig<T>;
}) => {
  const formValidationErrors: { [key: string]: string | null } = {};

  // Convert FormData to an object of type T
  const formDataObj = {} as T;
  const allKeys = new Set<keyof T>();

  if (validationConfig.requiredFields) {
    validationConfig.requiredFields.forEach((field) => {
      allKeys.add(field);
    });
  }

  if (validationConfig.customValidations) {
    (Object.keys(validationConfig.customValidations) as (keyof T)[]).forEach(
      (key) => {
        allKeys.add(key);
      }
    );
  }

  allKeys.forEach((key) => {
    const value = formData.get(key as string);
    if (value !== null) {
      formDataObj[key] = value as any;
    }
  });

  // Validate required fields
  if (validationConfig.requiredFields) {
    validationConfig.requiredFields.forEach((field) => {
      if (!formData.get(field as string)) {
        formValidationErrors[`${field as string}`] = `required`;
      }
    });
  }

  // Validate custom validations
  if (validationConfig.customValidations) {
    for (const field in validationConfig.customValidations) {
      const validationError =
        validationConfig.customValidations[field as keyof T]?.(formDataObj);
      if (validationError) {
        formValidationErrors[`${field}`] = validationError;
      }
    }
  }

  const hasErrors = Object.keys(formValidationErrors).length > 0;

  return {
    errors: formDataObj,
    validationErrors: formValidationErrors as ServerRequest<{
      [key in keyof T]: string;
    }>,
    hasErrors,
  };
};
