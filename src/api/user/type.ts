type rootUserType = {
  email: string;
  emailcode: string;
  captcha: string;
  nickname: string;
  passwd: string;
};

export type RegisterData = Omit<rootUserType, "emailcode">;

export type SendEmailData = Pick<rootUserType, "email">;

export type LoginData = Omit<rootUserType, "nickname">;
