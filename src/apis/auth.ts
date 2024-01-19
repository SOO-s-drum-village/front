import { User } from "@/types/user";
import { exceptionHandler } from "./exception-handler";
import { apiRequest } from "./index";
import { Card } from "@/types/payment";

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
    throw new Error(exceptionHandler(error, "API getMe error"));
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
