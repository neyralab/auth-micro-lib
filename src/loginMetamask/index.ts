import axios from 'axios';
import { getUserRSAKeys } from '../getUserRSAKeys/index.js';
import { publicKeyToPem } from '../publicKeyToPem/index.js';
import { setToken } from '../setToken/index.js';
import { ILoginMetamask } from '../types/index.js';

export const loginMetamask = async ({
  publicAddress,
  signature,
  NEYRA_AI_API,
  GHOST_DRIVE_API,
  signMessageAsync,
}: ILoginMetamask) => {
  try {
    const response = await axios.put(
      `${NEYRA_AI_API}/auth/identity/connect_userv8`,
      {
        publicAddress,
        provider: 'walletconnect',
        signature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    const isNewUser = response.data.message === 'Registration complete';

    if (isNewUser) {
      try {
        const keys = await getUserRSAKeys({ signMessageAsync, publicAddress });
        const pem = publicKeyToPem({ publicKey: keys.publicKey });
        const body = { publicAddress, publicKey: pem };
        const headers = { 'X-Token': `Bearer ${access_token}` };
        const url = `${GHOST_DRIVE_API}/keys/pub_key_save`;
        await axios.post(url, body, { headers });
      } catch (error) {
        console.error(error);
      }
    }

    setToken(response, access_token, refresh_token);
    return { isNewUser };
  } catch (err) {
    throw err;
  }
};
