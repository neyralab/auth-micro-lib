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
  NEIRA_AI_API: string;
}
