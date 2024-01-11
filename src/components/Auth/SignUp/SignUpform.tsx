import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import useToast from "@/hooks/useToast";
import { handleSignUp } from "@/apis/auth";
import { useLoading } from "@toss/use-loading";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  lng: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "2글자 이상 입력해주세요.")
      .required("이름은 필수입니다."),
    password: yup
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(12, "12글자 이내로 입력해주세요.")
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다"),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
    cardNumber: yup.string().required("카드번호 16자를 입력해주세요."),
    cardExpiry: yup.string().required("카드 유효기간 4자리를 입력해주세요."),
    birth: yup.string().required("생년월일 6자리를 입력해주세요."),
    cardPwd2digit: yup
      .string()
      .required("카드 비밀번호 앞 2자리를 입력해주세요."),
    cardCvc: yup.string().required("카드 CVC번호 3자리를 입력해주세요."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignUpForm = ({ lng }: Props) => {
  const { errorToast } = useToast();
  const [isLoading, startTransition] = useLoading();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation(lng, "auth");

  const signUpSubmit = async (payload: FormData) => {
    const singInPayload = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      cardNumber: payload.cardNumber,
      cardExpiry: payload.cardExpiry,
      birth: payload.birth,
      cardPwd2digit: payload.cardPwd2digit,
      cardCvc: payload.cardCvc,
    };

    try {
      const result = await startTransition(handleSignUp(singInPayload));
      console.log("result", result);
      router.push(`/${lng}`);
      reset();
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };

  return (
    <form className="text-gray mt-4" onSubmit={handleSubmit(signUpSubmit)}>
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
          placeholder="0000000000000000"
          maxLength={16}
          {...register("cardNumber")}
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
        <Label htmlFor="카드 유효기간">{t("card-expriation")}</Label>
        <Input
          type="text"
          placeholder="MMYY"
          maxLength={4}
          {...register("cardExpiry")}
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
          <span className="text-white text-sm md:text-lg">{t("signin")}</span>
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
