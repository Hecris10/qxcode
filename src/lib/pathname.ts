export interface PathNameParam {
  name: string;
  value: string;
}

export const getPathNameParams = (searchParams: URLSearchParams) => {
  const params: PathNameParam[] = [];
  searchParams.forEach((value, key) => {
    params.push({ name: key, value });
  });
  return params;
};

export const getParamErrors = <T>(params: PathNameParam[]): T => {
  const errors: T = {} as T;
  params.forEach((param) => {
    if (param.value === "required") {
      const keyOf = param.name as keyof T;
      errors[keyOf] =
        `The parameter ${param.name} is required.` as unknown as T[keyof T];
    }
  });
  return errors;
};
