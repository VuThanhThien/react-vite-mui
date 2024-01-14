import React, { createContext, useContext } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserInfo } from '../types';
import storage from 'core/utils/authStorage';
import { useNavigate } from 'react-router-dom';

interface AuthContextInterface {
  hasRole: (roles?: string[]) => {};
  isLoggingIn: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  userInfo?: UserInfo;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const accessToken = storage.getAccessTokenClient();

  const { isLoggingIn, login } = useLogin();
  const { data: userInfo } = useUserInfo(!!accessToken);

  const hasRole = (roles?: string[]): boolean => {
    if (!roles || roles.length === 0) {
      return true;
    }
    if (!userInfo) {
      return false;
    }
    return roles.includes(userInfo.role);
  };

  const handleLogin = (mail: string, password: string) => {
    return login({ mail, password })
      .then(({ data }) => {
        storage.setAccessTokenClient(data.accessToken);
        storage.setRefreshTokenClient(data.refreshToken);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = () => {
    storage.clearTokensClient();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        isLoggingIn,
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
