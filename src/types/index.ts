import { SignMessageMutateAsync } from 'wagmi/query';

export interface IWeb3NeyraAuth {
  authToken: string;
  refreshToken: string;
  state: any;
  label: string;
  history: any;
  provider: any;
  currentAccount: any;
  dispatch: any;
  redirectUrl: any;
  subdomain: any;
  API_SIGN_IN_METAMASK: any;
  handleMetamaskLogin: any;
  savePubKey: any;
  errorMessages: any;
  handleSignUp: any;
  searchParams: any;
  setSignatureError: any;
  setIsConnecting: any;
  addNotification: any;
  REACT_APP_UNSTOPPABLE_CLIENT_ID: any;
  API_AUTH: any;
  setToken: any;
  SIGN_IN_ERROR_MESSAGES: any;
  account: any;
  wallet: any;
  disconnect: any;
  connect: any;
  signMessage: any;
}

export interface ILoginEmail {
  name?: string;
  email: string;
  password: string;
  NEYRA_AI_API: string;
}

export interface ILoginMetamask {
  publicAddress: `0x${string}`;
  signature: string;
  NEYRA_AI_API: string;
  GHOST_DRIVE_API: string;
  signMessageAsync: SignMessageMutateAsync<unknown>;
}

export interface IGetUserRSAKeys {
  publicAddress: `0x${string}`;
  signMessageAsync: SignMessageMutateAsync<unknown>;
}

export interface ILoginTelegram {
  NEYRA_AI_API: string;
  telegramResponse: TelegramUser;
}

export interface TelegramUser {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

export interface ILoginGoogle {
  NEYRA_AI_API: string;
  credential: any;
}
