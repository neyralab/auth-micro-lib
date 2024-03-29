import axios from 'axios';
import { IGetNonce } from '../types/index.js';

export const getNonce = async ({ publicAddress, GHOST_DRIVE_API }: IGetNonce): Promise<string> => {
  try {
    const { data } = await axios.post(`${GHOST_DRIVE_API}/auth/nonce`, { publicAddress });
    return data.nonce;
  } catch (error) {
    throw error;
  }
};
