export interface RegisterOptions {
  required?: boolean;
  defaultValue?: string;
  validate?: (value: string) => boolean;
}

export const getInputCodeType = (codeType: string) => {
  switch (codeType) {
    case "URL":
      return "url";
    case "Text":
      return "text";
    case "Email":
      return "email";
    case "Phone":
      return "tel";
    case "Wifi":
      return "text";
    // case "Location":
    //   return "text";
    default:
      return "text";
  }
};
