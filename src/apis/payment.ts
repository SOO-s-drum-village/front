import { SortDirection } from "@/types";
import { ListRequest, apiRequest } from ".";
import { PaymentList } from "@/types/payment";
import { exceptionHandler } from "./exception-handler";

export const getPaymentList = async (request: ListRequest) => {
  const payload = {
    page: request.page,
    size: 10,
    direaction: "DESC" as SortDirection,
  };

  try {
    const response = await apiRequest.get<PaymentList>("/orders/me", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API getPaymentList error"));
  }
};
