import axios from 'axios';
import UAuth from '@uauth/js';

export const loginUnstoppableEffect = async ({
  history,
  redirectUrl,
  REACT_APP_UNSTOPPABLE_CLIENT_ID,
  API_AUTH,
  setToken,
}) => {
  try {
    const uauth = new UAuth({
      clientID: REACT_APP_UNSTOPPABLE_CLIENT_ID,
      redirectUri: window.location.origin,
    });
    const authorization = await uauth.loginWithPopup();
    const { wallet_address } = authorization.idToken || {};
    // @ts-ignore
    const { message, signature } = Object.values(
      authorization?.idToken?.proof
    )[0];
    const login = await axios.post(`${API_AUTH}/login_check_unstoppable`, {
      publicAddress: wallet_address,
      message,
      signature,
    });
    setToken(login);
    history.push(redirectUrl);
  } catch (error) {
    throw error;
  }
};
