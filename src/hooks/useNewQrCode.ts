import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLayoutEffect, useState } from "react";
import { useUrlState } from "state-in-url/next";
import { QrCodeType } from "~/services/qrcodes/qrcodes.type";
import { capitalizeText } from "~/utils/strings";

type NewQrCodeFlowProps = {
  position: number;
  name: string;
  type: QrCodeType;
  content: string;
  password?: string;
  ssid?: string;
  security?: string;
};

export const newQrCodeDefault: NewQrCodeFlowProps = {
  name: "",
  type: "text",
  content: "",
  position: 0,
  password: "",
  ssid: "",
  security: "nopass",
};

export type FormError = {
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
    if (urlState.position < 0 || urlState.position > 2) router.push("/404");
  }, [urlState.position, router]);

  const moveForward = () => {
    switch (urlState.position) {
      case 0:
        if (!urlState.type)
          return setErrors({ ...errors, type: "Type is required!" });
        break;
      case 1:
        if (!urlState.name)
          return setErrors({ ...errors, name: "Name is required!" });
        break;
      case 2:
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

    urlState.position < 2 &&
      setUrl(() => ({ ...urlState, position: urlState.position + 1 }));
  };
  const moveBackward = () =>
    urlState.position > 0 &&
    setUrl(() => ({ ...urlState, position: urlState.position - 1 }));

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

  return {
    ...urlState,
    setUrl,
    setPosition,
    setState,
    setQrCodeType,
    setQrCodeName,
    onChangeWifiValues,
    setQrCodeContent,
    moveForward,
    moveBackward,
    errors,
    setError,
    setErrorRequired,
    quantityExpired,
  };
};
