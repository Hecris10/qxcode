import { useRef } from "react";

export const useFormValues = <T>(initialValues?: T) => {
  const formValuesRef = useRef<T>(initialValues || ({} as T));

  const handleChange = <K extends keyof T>(key: K, value: T[K]) =>
    (formValuesRef.current = { ...formValuesRef.current, [key]: value });

  const getValue = (key: keyof T) => formValuesRef?.current[key];

  return { formValues: formValuesRef, handleChange, getValue };
};
