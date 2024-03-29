import axios from 'axios';
import { IAuthInfoResponse, IGetAuthInfo } from '../types/index.js';

export const getAuthInfo = async ({ publicAddress, GHOST_DRIVE_API, token }: IGetAuthInfo) => {
  const body = { publicAddress };
  const headers = { 'X-Token': `Bearer ${token}` };
  const url = `${GHOST_DRIVE_API}/user/auth/info`;
  const { data } = await axios.post<IAuthInfoResponse>(url, body, { headers });
  return data;
};
