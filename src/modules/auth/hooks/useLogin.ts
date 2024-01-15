import { axios } from 'core/lib/axios';
import { useMutation } from 'react-query';
import { ApiLoginRes } from '../types';

const login = async ({ mail, password }: { mail: string; password: string }): Promise<ApiLoginRes> => {
  const res = await axios.post('/session/createClientSession', { mail, password });
  return res;
};

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);

  return { isLoggingIn: isLoading, login: mutateAsync };
}
