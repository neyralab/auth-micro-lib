import axios from 'axios';
import { getUserRSAKeys } from '../getUserRSAKeys/index.js';
import { publicKeyToPem } from '../publicKeyToPem/index.js';
import { ISavePublicKey } from '../types/index.js';

export const savePublicKey = async ({
  signMessageAsync,
  provider,
  publicAddress,
  token,
  GHOST_DRIVE_API,
}: ISavePublicKey) => {
  try {
    const keys = await getUserRSAKeys({ signMessageAsync, publicAddress, provider });
    const pem = publicKeyToPem({ publicKey: keys.publicKey });
    const body = { publicAddress, publicKey: pem };
    const headers = { 'X-Token': `Bearer ${token}` };
    const url = `${GHOST_DRIVE_API}/keys/pub_key_save`;
    await axios.post(url, body, { headers });
  } catch (error) {
    console.error(error);
  }
};
