import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Language } from "@/types";
import { ErrorMessage } from "@hookform/error-message";
import { useHookFormMask } from "use-mask-input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FindEmailFormData } from "./FindEmailContainer";
import { FormEvent } from "react";

interface Props {
  lng: Language;
  register: UseFormRegister<FindEmailFormData>;
  errors: FieldErrors<FindEmailFormData>;
  isLoading: boolean;
  isValid: boolean;
  onSubmit: () => void;
}

const FindEmailForm = ({
  lng,
  errors,
  register,
  isLoading,
  isValid,
  onSubmit,
}: Props) => {
  const { t } = useTranslation(lng, "auth");

  const registerWithMask = useHookFormMask(register);

  return (
    <form className="text-gray mt-4" onSubmit={onSubmit}>
      <div className="grid items-center gap-1.5 mb-2">
        <Label htmlFor="이름">{t("name")}</Label>
        <Input
          type="text"
          placeholder={t("name-placeholder")}
          {...register("name")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="카드번호">{t("card-number")}</Label>
        <Input
          type="text"
          placeholder="0000-0000-0000-0000"
          {...registerWithMask("cardNumber", ["9999-9999-9999-9999"], {
            required: true,
          })}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />

        <ErrorMessage
          errors={errors}
          name="cardNumber"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="flex justify-center mt-8 px-4 md:px-24 ">
        {!isLoading && (
          <Button
            type="submit"
            className="bg-firebrick disabled:bg-gray disabled:text-silver w-full py-7 rounded-xl hover:bg-parrent hover:text-white"
            disabled={!isValid}
          >
            <span className="text-white text-sm md:text-lg">{t("submit")}</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default FindEmailForm;
