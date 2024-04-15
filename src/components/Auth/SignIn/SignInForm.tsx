import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Language } from "@/types";
import { UseFormRegister } from "react-hook-form";
import { SingInFormData } from "./SignInContainer";

interface Props {
  lng: Language;
  isLoading: boolean;
  isValid: boolean;
  register: UseFormRegister<SingInFormData>;
  handleSubmit: () => void;
}

const SignInForm = ({
  lng,
  isLoading,
  isValid,
  register,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation(lng, "auth");

  return (
    <form className="text-gray mt-4" onSubmit={handleSubmit}>
      <div className="grid items-center gap-1.5 mb-2">
        <Label htmlFor="이메일">{t("email")}</Label>

        <input
          type="text"
          placeholder={t("email-placeholder")}
          {...register("email")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-3 text-lg focus:border-gray outline-none"
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="비밀번호">{t("password")}</Label>
        <input
          type="password"
          placeholder={t("pw-placeholder")}
          {...register("password")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-3 text-lg focus:border-gray outline-none"
        />
      </div>
      <div className="flex justify-center mt-8 px-4 md:px-24 ">
        <Button
          type="submit"
          className="bg-firebrick disabled:bg-gray disabled:text-silver w-full py-7 rounded-xl hover:bg-parrent hover:text-white"
          disabled={!isValid || isLoading}
        >
          <span className="text-white text-sm md:text-lg">{t("signin")}</span>
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
