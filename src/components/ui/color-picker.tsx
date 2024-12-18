"use client";
import { ColorPicker } from "@ark-ui/react";
import { PipetteIcon } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Button } from "./button";

export const ColorPickerInput = (props: ColorPicker.RootProps) => {
  return (
    <ColorPicker.Root {...props}>
      <ColorPicker.Context>
        {(api) => (
          <>
            <ColorPicker.Label>Color Picker</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.ChannelInput channel="hex" asChild>
                <Input />
              </ColorPicker.ChannelInput>
              <ColorPicker.Trigger asChild>
                <Button variant="outline">
                  <ColorPicker.Swatch value={api.value} />
                </Button>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <div>
                  <ColorPicker.Area>
                    <ColorPicker.AreaBackground />
                    <ColorPicker.AreaThumb />
                  </ColorPicker.Area>
                  <div>
                    <ColorPicker.EyeDropperTrigger asChild>
                      <Button
                        className="xs"
                        variant="outline"
                        aria-label="Pick a color"
                      >
                        <PipetteIcon />
                      </Button>
                    </ColorPicker.EyeDropperTrigger>
                    <div>
                      <ColorPicker.ChannelSlider channel="hue">
                        <ColorPicker.ChannelSliderTrack />
                        <ColorPicker.ChannelSliderThumb />
                      </ColorPicker.ChannelSlider>
                      <ColorPicker.ChannelSlider channel="alpha">
                        <ColorPicker.TransparencyGrid size="8px" />
                        <ColorPicker.ChannelSliderTrack />
                        <ColorPicker.ChannelSliderThumb />
                      </ColorPicker.ChannelSlider>
                    </div>
                  </div>
                  <div>
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                    <ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input />
                    </ColorPicker.ChannelInput>
                  </div>
                  <div>
                    <p>Saved Colors</p>
                    <ColorPicker.SwatchGroup>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger key={id} value={color}>
                          <ColorPicker.Swatch value={color} />
                        </ColorPicker.SwatchTrigger>
                      ))}
                    </ColorPicker.SwatchGroup>
                  </div>
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        )}
      </ColorPicker.Context>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
};

const presets = [
  "hsl(10, 81%, 59%)",
  "hsl(60, 81%, 59%)",
  "hsl(100, 81%, 59%)",
  "hsl(175, 81%, 59%)",
  "hsl(190, 81%, 59%)",
  "hsl(205, 81%, 59%)",
  "hsl(220, 81%, 59%)",
  "hsl(250, 81%, 59%)",
  "hsl(280, 81%, 59%)",
  "hsl(350, 81%, 59%)",
];
