import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
      toast("", {
        description: "Your account has been created successfully",
        type: "success",
      });
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      if (error.message === "Email already registered") {
        setError("email", {
          type: "validate",
          message: "Email already registered",
        });
      } else if (error.message === "Phone number already registered") {
        setError("phone", {
          type: "validate",
          message: "Phone number already registered",
        });
      }
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    mutate(data);
  };

  const onSubmitForm = handleSubmit(onSubmit);
  // const onSubmitForm = handleSubmit((e) => console.log(e));

  return { onSubmitForm, errors, register, passwordRef, setValue, isPending };
};
