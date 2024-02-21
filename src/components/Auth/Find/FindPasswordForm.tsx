import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useToast from "@/hooks/useToast";
import { handleFindPassword } from "@/apis/auth";
import { useLoading } from "@toss/use-loading";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Language } from "@/types";
import { ErrorMessage } from "@hookform/error-message";
import { useHookFormMask } from "use-mask-input";

interface Props {
  lng: Language;
  handleResetedPassword: (value: string) => void;
}

const schema = yup
  .object({
    cardNumber: yup.string().required("카드번호 16자를 입력해주세요."),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
    cardPwd2digit: yup
      .string()
      .length(2, "카드 비밀번호 앞 2자리를 입력해주세요.")
      .required("카드 비밀번호 앞 2자리를 입력해주세요."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const FindPasswordForm = ({ lng, handleResetedPassword }: Props) => {
  const { errorToast, successToast } = useToast();
  const [isLoading, startTransition] = useLoading();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation(lng, "auth");

  const registerWithMask = useHookFormMask(register);

  const findEmailSubmit = async (payload: FormData) => {
    try {
      const response = await startTransition(
        handleFindPassword({
          email: payload.email,
          cardNumber: payload.cardNumber.replace(/-/g, ""),
          cardPwd2digit: payload.cardPwd2digit,
        })
      );
      if (response.password) {
        handleResetedPassword(response.password);
      }
      successToast(t("find-password-success"));
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };

  return (
    <form className="text-gray mt-4" onSubmit={handleSubmit(findEmailSubmit)}>
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

export default FindPasswordForm;
