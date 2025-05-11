import { capitalizeText } from "@/utils/strings";
import { QrCodeType } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLayoutEffect, useState } from "react";
import { useUrlState } from "state-in-url/next";

type NewQrCodeFlowProps = {
  position: number;
  name: string;
  type: QrCodeType;
  content: string;
  password?: string;
  ssid?: string;
  security?: string;
  isControlled?: boolean;
};

export const newQrCodeDefault: NewQrCodeFlowProps = {
  isControlled: false,
  name: "",
  type: "text",
  content: "",
  position: 0,
  password: "",
  ssid: "",
  security: "nopass",
};

export type FormError = {
  isControlled?: string;
  name?: string;
  type?: string;
  content?: string;
  password?: string;
  security?: string;
};

export const useNewQrCode = ({
  params,
  router,
}: {
  params: SearchParamsNotPromise;
  router: AppRouterInstance;
}) => {
  const { urlState, setUrl, setState } = useUrlState(newQrCodeDefault, {
    searchParams: params,
  });

  const [errors, setErrors] = useState<FormError>({} as FormError);
  const quantityExpired = useState(false);

  useLayoutEffect(() => {
    if (urlState.position < 0 || urlState.position > 4) router.push("/404");
  }, [urlState.position, router]);

  const moveForward = () => {
    const state = urlState;

    if (state.isControlled) state.type = "link";

    switch (state.position) {
      case 1:
        if (!urlState.type)
          return setErrors({ ...errors, type: "Type is required!" });
        break;
      case 2:
        if (!urlState.name)
          return setErrors({ ...errors, name: "Name is required!" });
        break;
      case 3:
        if (!urlState.content)
          return setErrors({ ...errors, content: "Content is required!" });

        if (urlState.type === "wifi") {
          if (!urlState.security)
            return setErrors({ ...errors, security: "Security is required!" });
          if (!urlState.password && urlState.security !== "nopass")
            return setErrors({ ...errors, password: "Password is required!" });
        }
        break;
    }
    if (urlState.position === 0 && urlState.isControlled) {
      return setUrl(() => ({ ...state, position: 2 }));
    }
    if (urlState.position < 3)
      return setUrl(() => ({ ...state, position: urlState.position + 1 }));
  };

  const moveBackward = () => {
    if (urlState.position <= 0) return;

    const state = urlState;

    if (state.isControlled) state.type = "link";

    if (state.position === 2 && state.isControlled) {
      return setUrl(() => ({ ...state, position: 0 }));
    }
    setUrl(() => ({ ...state, position: state.position - 1 }));
  };

  const setQrCodeType = (type: string) => {
    setUrl(() => ({ ...urlState, type: type as QrCodeType }));
  };

  const setQrCodeName = (name: string) => {
    setUrl(() => ({
      ...urlState,
      name,
    }));
    if (errors.name) setErrors({ ...errors, name: "" });
  };

  const onChangeWifiValues = (
    key: "ssid" | "password" | "security",
    value: string
  ) => {
    setUrl(() => ({
      ...urlState,
      [key]: value,
    }));

    if (key === "security" && errors.security)
      setErrors({ ...errors, security: "" });
    if (key === "password" && errors.password)
      setErrors({ ...errors, password: "" });
  };

  const setQrCodeContent = (content: string) => {
    setUrl(() => ({
      ...urlState,
      content,
    }));
    if (errors.content) setErrors({ ...errors, content: "" });
  };

  const setPosition = (position: number) =>
    setUrl(() => ({
      ...urlState,
      position,
    }));

  const setError = (key: keyof FormError, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setErrorRequired = (key: keyof FormError) => {
    setError(key, `${capitalizeText(key)} is required!`);
  };

  const toggleControlled = () => {
    setUrl(() => ({ ...urlState, isControlled: !urlState.isControlled }));
  };

  return {
    ...urlState,
    setUrl,
    setPosition,
    setState,
    setQrCodeType,
    setQrCodeName,
    onChangeWifiValues,
    setQrCodeContent,
    toggleControlled,
    moveForward,
    moveBackward,
    errors,
    setError,
    setErrorRequired,
    quantityExpired,
  };
};
