import { redirect } from "next/navigation";
import { FormButton } from "~/components/form-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const MainLoginForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        redirect("/");
      }}
      className="flex flex-col w-full mt-4 gap-4"
    >
      <div className="duration-300 bg-yellow-300 my-2 ease-in-out transition-all collapseItem w-full relative">
        <div className="relative w-full text-center mx-auto bg-red-400">
          <p className="text-red-500 text-center absolute w-full">
            Invalid email or password
          </p>
        </div>
      </div>
      <div>
        <Label className="text-white ml-2" htmlFor="email">
          Email
        </Label>
        <Input
          autoComplete="current-email"
          name="email"
          placeholder="Your email address"
        />
      </div>
      <div>
        <Label className="text-white ml-2" htmlFor="password">
          Password
        </Label>
        <Input
          autoComplete="current-password"
          name="password"
          placeholder="Your password"
          type="password"
        />
      </div>
      <FormButton buttonLabel="Sign in" loadingLabelText="Signing in" />
    </form>
  );
};
