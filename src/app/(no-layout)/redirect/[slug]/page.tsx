import { Metadata } from "next";
import { Suspense } from "react";
import { RedirectLoading } from "./components/redirect-loading";
import { RedirectPage } from "./components/redirect-page";

export const metadata: Metadata = {
  title: "QX Code",
  description: "Your codes last forever",
};

export default async function Redirect(propsPage: PageProps) {
  return (
    <Suspense fallback={<RedirectLoading />}>
      <RedirectPage {...propsPage} />
    </Suspense>
  );
}
