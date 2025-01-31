"use client";
import {
  ColorPicker,
  ColorService,
  IColor,
  useColor,
} from "react-color-palette";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const ColorPickerInput = ({
  defaultColor,
  name,
  className,
  onChange,
}: {
  defaultColor?: string;
  name?: string;
  className?: string;
  onChange?: (newColor: string) => void;
}) => {
  const [color, setColor] = useColor(defaultColor || "#ffffff");

  const onColorChange = (color: IColor) => {
    setColor(color as IColor);
    onChange && onChange(color.hex);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[40px] h-[40px] rounded-lg border-2 p-6 border-blue1 hover:border-gray-200",
              className
            )}
            style={{ backgroundColor: color.hex }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto text-lg p-1 shadow-lg rounded-lg border-none">
          <ColorPicker
            onChangeComplete={onColorChange}
            hideInput={["hsv", "rgb"]}
            color={color}
            onChange={setColor}
          />
          <div>
            {presets.map((preset) => (
              <Button
                key={preset}
                variant="outline"
                className="w-8 h-8 rounded-lg border-2 p-1 border-blue1 hover:border-gray-200"
                style={{ backgroundColor: preset }}
                onClick={() =>
                  onColorChange({
                    hex: ColorService.toHex(preset),
                    hsv: ColorService.toHsv(preset),
                    rgb: ColorService.toRgb(preset),
                  })
                }
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <input name={name} readOnly value={color.hex} className="hidden" />
    </>
  );
};

const presets = [
  "#e63946",
  "#f4a261",
  "#2a9d8f",
  "#00a8e8",
  "#0077b6",
  "#023e8a",
  "#03045e",
  "#7209b7",
  "#b5179e",
  "#ff006e",
  "#561ecb",
];
