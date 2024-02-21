import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";
import { useQueryClient } from "@tanstack/react-query";
import { useHookFormMask } from "use-mask-input";
import {
  FieldErrors,
  FormSubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { SignUpFormData } from "./SignUpContainer";
import { FormEvent } from "react";

type Props = {
  lng: string;
  onSubmit: () => void;
  register: UseFormRegister<SignUpFormData>;
  isValid: boolean;
  errors: FieldErrors<SignUpFormData>;
};

const SignUpForm = ({ lng, onSubmit, register, isValid, errors }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const registerWithMask = useHookFormMask(register);

  const { t } = useTranslation(lng, "auth");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="text-gray mt-4" onSubmit={handleSubmit}>
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
      <div className="grid items-center gap-1.5 mb-2">
        <Label htmlFor="이메일">{t("email")}</Label>
        <Input
          type="email"
          placeholder={t("email-placeholder")}
          {...register("email")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="비밀번호">{t("password")}</Label>
        <Input
          type="password"
          placeholder={t("pw-placeholder")}
          {...register("password")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="비밀번호확인">{t("pw-confirm")}</Label>
        <Input
          type="password"
          placeholder={t("pw-placeholder")}
          {...register("passwordConfirm")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="passwordConfirm"
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
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="카드 유효기간">{t("card-expiration")}</Label>
        <Input
          type="text"
          placeholder="MM/YY"
          {...registerWithMask("cardExpiry", ["99/99"], {
            required: true,
          })}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="cardExpiry"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="생년월일">{t("birth")}</Label>
        <Input
          type="text"
          placeholder="YYMMDD"
          maxLength={6}
          {...register("birth")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="birth"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="카드 비밀번호">{t("cardPwd2digit")}</Label>
        <Input
          type="password"
          placeholder="00**"
          {...register("cardPwd2digit")}
          maxLength={2}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="cardPwd2digit"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="grid items-center gap-1.5 my-4">
        <Label htmlFor="카드 CVC">{t("card-cvc")}</Label>
        <Input
          type="password"
          placeholder="000"
          {...register("cardCvc")}
          maxLength={3}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
        />
        <ErrorMessage
          errors={errors}
          name="cardCvc"
          render={({ message }) => (
            <p className="text-error font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="flex justify-center mt-8 px-4 md:px-24 ">
        <Button
          type="submit"
          className="bg-firebrick disabled:bg-disabled disabled:text-silver w-full py-7 rounded-xl hover:bg-parrent hover:text-white"
          disabled={!isValid}
        >
          <span className="text-white text-sm md:text-lg">{t("signup")}</span>
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
