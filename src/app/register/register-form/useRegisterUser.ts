import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "~/services/user";
import { RegisterForm } from "./register-form-types";

export const useRegisterUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    setValue,
  } = useForm<RegisterForm>();
  const router = useRouter();
  const passwordRef = useRef<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const res = await registerUser(data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      console.log("User registered successfully");
    },
    onError: (error) => {
      if (error.message === "User already exists") {
        setError("email", {
          type: "validate",
          message: "Email already registered",
        });
      }
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    mutate(data);
  };

  const onSubmitForm = handleSubmit(onSubmit);

  return { onSubmitForm, errors, register, passwordRef, setValue, isPending };
};
