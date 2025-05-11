import { Spinner } from "@/components/ui/spinner";

export const RedirectLoading = () => (
  <div className="w-full flex align-middle min-h-screen bg-blue4">
    <div className="flex gap-4 mx-4 my-3">
      {" "}
      Redirecting... <Spinner />
    </div>
  </div>
);
