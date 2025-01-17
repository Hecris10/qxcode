import html2canvas from "html2canvas";
import { useRef } from "react";

export const useDivToImage = (fileName: string) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const onDownload = async () => {
    if (divRef.current === null) {
      return;
    }
    try {
      const canvas = await html2canvas(divRef.current);
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return { divRef, onDownload };
};
