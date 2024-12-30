import { toPng } from "html-to-image";
import { useRef } from "react";

export const useDivToImage = (fileName: string) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const onDownload = async () => {
    if (divRef.current === null) {
      return;
    }
    toPng(divRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  };

  return { divRef, onDownload };
};
