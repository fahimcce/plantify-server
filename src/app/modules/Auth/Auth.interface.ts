export type TLoginRequest = {
  email: string;
  password: string;
};

export type tokenPayload = {
  email: string;
  role: string;
  name?: string;
};
