export enum UserRole {
  Root = 'root',
  Admin = 'admin',
  Client = 'client',
}

export interface UserInfo {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type ApiLoginRes = {
  data: LoginRes;
};
