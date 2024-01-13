import React, { createContext, useContext, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserInfo } from '../types/userInfo';
import storage from 'core/utils/authStorage';

interface AuthContextInterface {
  hasRole: (roles?: string[]) => {};
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  userInfo?: UserInfo;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const accessToken = storage.getAccessTokenClient();

  const { isLoggingIn, login } = useLogin();
  const { isLoggingOut, logout } = useLogout();
  const { data: userInfo } = useUserInfo(accessToken);

  const hasRole = (roles?: string[]) => {
    if (!roles || roles.length === 0) {
      return true;
    }
    if (!userInfo) {
      return false;
    }
    return roles.includes(userInfo.role);
  };

  const handleLogin = async (email: string, password: string) => {
    return login({ email, password })
      .then((key: string) => {
        storage.setAccessTokenClient(key);
        return key;
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = async () => {
    return logout()
      .then((data) => {
        storage.clearTokensClient();
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        isLoggingIn,
        isLoggingOut,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
