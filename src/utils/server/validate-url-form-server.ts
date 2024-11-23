export type ValidationFunction<T> = (values: T) => string | null;

export interface ValidationConfig<T> {
  requiredFields?: (keyof T)[];
  customValidations?: { [key in keyof T]?: ValidationFunction<T> };
}

export const validateUrlFormServer = <T>({
  pageUrl,
  validationConfig,
}: {
  pageUrl: string;
  validationConfig: ValidationConfig<T>;
}) => {
  const urlParams = new URLSearchParams(pageUrl.split("?")[1]);
  const errors = {} as T;
  const validationErrors: { [key: string]: string } = {};

  urlParams.forEach((value, key) => {
    const originalKey = key.replace("Validate", "") as keyof T;
    if (key.endsWith("Validate")) {
      validationErrors[originalKey as string] = value;
    } else {
      errors[originalKey] = value as T[keyof T];
    }
  });

  if (validationConfig.requiredFields) {
    validationConfig.requiredFields.forEach((field) => {
      if (!errors[field]) {
        validationErrors[`${field.toString()}`] = `required`;
      }
    });
  }

  if (validationConfig.customValidations) {
    for (const field in validationConfig.customValidations) {
      const validationError =
        validationConfig.customValidations[field as keyof T]?.(errors);
      if (validationError) {
        validationErrors[`${field}`] = validationError;
      }
    }
  }

  const finalErrors = {} as T;
  Object.keys(validationErrors).forEach((key) => {
    const originalKey = key.replace("Validate", "") as keyof T;
    finalErrors[originalKey] = validationErrors[key] as T[keyof T];
  });

  return { errors: finalErrors, validationErrors };
};
