import { useQuery } from 'react-query';
import { UserInfo } from '../types';
import { axios } from 'core/lib/axios';

const fetchUserInfo = async (): Promise<UserInfo> => {
  const { data } = await axios.get('authentication/client');
  return data;
};

export function useUserInfo(enabled: boolean) {
  return useQuery(['user-info'], () => fetchUserInfo(), {
    enabled,
  });
}
