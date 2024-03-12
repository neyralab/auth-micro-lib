import axios from 'axios';
import { getUserRSAKeys } from '../getUserRSAKeys';
import { publicKeyToPem } from '../publicKeyToPem';
import { ethers } from 'ethers';
import { setToken } from '../setToken';

export const loginMetamask = async ({
  publicAddress,
  signature,
  NEYRA_AI_API,
  API_PUB_KEY_SAVE
}) => {
  try {
    const response = await axios.put(
      `${NEYRA_AI_API}/auth/identity/connect_userv8`,
      {
        publicAddress,
        provider: 'walletconnect',
        signature
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const access_token = response.data.data.access_token
    const refresh_token = response.data.data.refresh_token


    const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = currentProvider.getSigner();
    getUserRSAKeys({ signer }).then((keys) => {
      const pem = publicKeyToPem({ publicKey: keys.publicKey })
      const body = { publicAddress, keys: pem };
      const headers = { "X-Token": `Bearer ${access_token}` }

      return axios.post(
        API_PUB_KEY_SAVE,
        body,
        {
          headers
        }
      );
    });

    setToken(response, access_token, refresh_token)
  } catch (err) {
    console.log(err)
  }
}

