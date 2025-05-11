"use client";

import { Logo } from "@/server/db/logo-schema.utilts";
import { use, useState } from "react";
import { SelectLogoItem } from "../../selectable-logo-item";

export const LogosGrid = ({ logos }: { logos: Promise<Logo[]> }) => {
  const userLogos = use(logos);
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);

  return (
    <section className="grid grid-cols-4 gap-4 py-4">
      {userLogos.map((logo) => (
        <SelectLogoItem
          isSelected={selectedLogo?.id === logo.id}
          key={`logo-${logo.id}`}
          logo={logo}
          onSelect={setSelectedLogo}
        />
      ))}
    </section>
  );
};
