export const getFormDataObject = <T>(
  formData: FormData,
  keysOfT: (keyof T)[]
): T => {
  const formDataObj = {} as T;

  // Create a set of keys of T
  const keysSet = new Set<keyof T>(keysOfT);

  // Iterate over formData keys and add only those that are keys of T
  for (const key of formData.keys()) {
    if (keysSet.has(key as keyof T)) {
      const value = formData.get(key);
      if (value !== null) {
        formDataObj[key as keyof T] = value as any;
      }
    }
  }

  return formDataObj;
};
