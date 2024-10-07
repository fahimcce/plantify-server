export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  user: string;
  token: string;
};
