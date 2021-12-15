import http from "@/utils/request";
import { SendEmailData, RegisterData, LoginData } from "./type";

export const sendEmail = (requestData: SendEmailData) => {
  return http({
    method: "GET",
    params: requestData,
    url: "/api/sendcode",
  });
};

export const registerUser = (requestData: RegisterData) => {
  return http({
    method: "POST",
    data: requestData,
    url: "/api/user/register",
  });
};


export const loginUser = (requestData: LoginData) => {
  return http({
    method: "POST",
    data: requestData,
    url: '/api/user/login'
  })
}