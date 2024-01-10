import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type Props = {
  lng: string;
};

type Inputs = {
  email: string;
  password: string;
};

const SignInForm = ({ lng }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { t } = useTranslation(lng, "auth");

  return (
    <form className="text-gray mt-4">
      <div className="grid items-center gap-1.5 mb-2">
        <Label htmlFor="이메일">{t("email")}</Label>
        <Input
          type="email"
          placeholder={t("email-placeholder")}
          {...register("email")}
          className="border-b-2 border-t-0 border-r-0  border-l-0 border-silver bg-white py-6 text-lg focus:border-gray"
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
      </div>
      <div className="flex justify-center mt-8 px-4 md:px-24 ">
        <Button
          type="submit"
          className="bg-firebrick disabled:bg-disabled disabled:text-silver w-full py-7 rounded-xl"
        >
          <span className="text-white text-sm md:text-lg">{t("signin")}</span>
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
