import QrCodeWithLogo from "qrcode-with-logos";

export const QrCodeTest = async (props: {
  code: string;
  className?: string;
  logoSrc?: string;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  logoBackground?: string;
  logoPadding?: number;
  logoBorderRadius?: number;
}) => {
  const {
    code,
    className,
    logoSrc,
    padding,
    backgroundColor,
    borderRadius,
    logoPadding,
    logoBackground,
    logoBorderRadius,
  } = props;

  const newQrCode = new QrCodeWithLogo({
    content: code,
    width: 380,
    nodeQrCodeOptions: {
      margin: padding,
      color: {
        dark: "#000000ff",
        light: "#ffffffff",
      },
      errorCorrectionLevel: "H",
    },
  });

  const image = newQrCode.getImage();

  console.log({ newQrCode, image });

  return <div id="qr-code" className={className}></div>;
};
