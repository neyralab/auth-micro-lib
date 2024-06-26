import axios from 'axios';
import { setToken } from '../setToken/index.js';
import { IloginWeb3 } from '../types/index.js';
import { redirectionAfterLogin } from '../utils/redirectionAfterLogin.js';
import { getNonce } from '../getNonce/index.js';
import { signMessage } from '../signMessage/index.js';
import { getAuthInfo } from '../getAuthInfo/index.js';
import { savePublicKey } from '../savePublicKey/index.js';
import { getUserIp } from '../utils/getUserIp.js';

export const loginWeb3 = async ({
  publicAddress,
  NEYRA_AI_API,
  GHOST_DRIVE_API,
  signMessageAsync,
  provider,
  autoRedirect = true,
  shouldSetToken = true,
}: IloginWeb3) => {
  try {
    const nonce = await getNonce({ publicAddress, GHOST_DRIVE_API });
    const message = `Welcome to Neyra Network. Your ID for this signature request is: ${nonce}`;

    const signature = await signMessage({ publicAddress, message, signMessageAsync, provider });

    const userIp = await getUserIp();
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
          'X-Real-IP': userIp,
        },
      }
    );
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    const isNewUser = response.data.message === 'Registration complete';

    try {
      if (isNewUser) {
        await savePublicKey({ signMessageAsync, provider, publicAddress, token: access_token, GHOST_DRIVE_API });
      } else {
        const data = await getAuthInfo({ publicAddress, GHOST_DRIVE_API, token: access_token });
        if (!data.public_key || data.public_key.length === 0) {
          await savePublicKey({ signMessageAsync, provider, publicAddress, token: access_token, GHOST_DRIVE_API });
        }
      }
    } catch (error) {
      console.error(error);
    }

    shouldSetToken && setToken(response, access_token, refresh_token);

    autoRedirect && redirectionAfterLogin(isNewUser);
    return { isNewUser, access_token, refresh_token };
  } catch (err) {
    throw err;
  }
};
