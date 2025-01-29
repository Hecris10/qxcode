"use client";

import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { use } from "react";

export const RedirectClient = ({
  headersList,
  params,
}: {
  headersList?: Promise<ReadonlyHeaders>;
  params: Params;
}) => {
  const getParams = use(params);

  return <></>;
};
