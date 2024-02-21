import { User } from "@/types/user";
import { exceptionHandler } from "./exception-handler";
import { apiRequest } from "./index";
import { Card } from "@/types/payment";
import { FindEmailResponse, FindPasswordResponse } from "@/types/auth";

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  cardNumber: string;
  cardExpiry: string;
  birth: string;
  cardPwd2digit: string;
  cardCvc: string;
}

interface FindEmailPayload {
  name: string;
  cardNumber: string;
}

interface FindPasswordPayload {
  email: string;
  cardNumber: string;
  cardPwd2digit: string;
}

export const handleSignIn = async (payload: SignInPayload) => {
  try {
    const response = await apiRequest.post("/auth/login/email", payload);
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleSignIn error"));
  }
};

export const handleSignUp = async (payload: SignUpPayload) => {
  try {
    const response = await apiRequest.post("/auth/signup", payload);
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleSignUp error"));
  }
};

export const handleFindEmail = async (
  payload: FindEmailPayload
): Promise<FindEmailResponse> => {
  try {
    const response = await apiRequest.post<FindEmailResponse>(
      "/auth/find/id",
      payload
    );
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleFindEmail error"));
  }
};

export const handleFindPassword = async (
  payload: FindPasswordPayload
): Promise<FindPasswordResponse> => {
  try {
    const response = await apiRequest.post<FindPasswordResponse>(
      "/auth/find/password",
      payload
    );
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleFindPassword error"));
  }
};

export const handleChangePassword = async ({
  password,
}: {
  password: string;
}) => {
  try {
    const response = await apiRequest.patch("/auth/password", { password });
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleChangePassword error"));
  }
};

export const handleSignOut = async () => {
  try {
    const response = await apiRequest.post("/auth/logout");
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API handleSignOut error"));
  }
};

export const getMe = async () => {
  try {
    const response = await apiRequest.get<User>("/users/me");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPaymentMe = async () => {
  try {
    const response = await apiRequest.get<Card>("/payments/me");
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API getPaymentMe error"));
  }
};

export const updateSubscription = async (subscription: boolean) => {
  try {
    const response = await apiRequest.patch("/payments/subscription", {
      subscription,
    });
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API updateSubscription error"));
  }
};
