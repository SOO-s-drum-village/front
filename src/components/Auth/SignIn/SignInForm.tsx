import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useToast from "@/hooks/useToast";
import { handleSignIn, testSignIn } from "@/apis/auth";
import { useLoading } from "@toss/use-loading";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  lng: string;
};

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(12, "12글자 이내로 입력해주세요.")
      .required(),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignInForm = ({ lng }: Props) => {
  const { errorToast, successToast } = useToast();
  const [isLoading, startTransition] = useLoading();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation(lng, "auth");

  const signInSubmit = async (payload: FormData) => {
    try {
      await startTransition(handleSignIn(payload));

      successToast(t("signin-success"));
      await queryClient.refetchQueries({
        queryKey: ["user"],
      });

      router.push(`/${lng}`);
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };

  return (
    <form className="text-gray mt-4" onSubmit={handleSubmit(signInSubmit)}>
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
        {!isLoading && (
          <Button
            type="submit"
            className="bg-firebrick disabled:bg-gray disabled:text-silver w-full py-7 rounded-xl hover:bg-parrent hover:text-white"
            disabled={!isValid}
          >
            <span className="text-white text-sm md:text-lg">{t("signin")}</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default SignInForm;
