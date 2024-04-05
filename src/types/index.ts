export interface ILoginEmail {
  name?: string;
  email: string;
  password: string;
  NEYRA_AI_API: string;
}

export interface IloginWeb3 {
  publicAddress: `0x${string}`;
  NEYRA_AI_API: string;
  GHOST_DRIVE_API: string;
  signMessageAsync?: any;
  autoRedirect?: boolean;
  provider?: any;
}

export interface IGetUserRSAKeys {
  publicAddress: `0x${string}`;
  signMessageAsync?: any;
  provider?: any;
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

export interface IGetNonce {
  GHOST_DRIVE_API: string;
  publicAddress: `0x${string}`;
}

export interface ISignMessage {
  message: string;
  publicAddress: `0x${string}`;
  signMessageAsync?: any;
  provider?: any;
}

export interface IGetAuthInfo {
  GHOST_DRIVE_API: string;
  publicAddress: `0x${string}`;
  token: string;
}

export interface IAuthInfoResponse {
  public_key?: string;
  mercure_jwt: string;
}

export interface ISavePublicKey {
  signMessageAsync?: any;
  provider?: any;
  publicAddress: `0x${string}`;
  token: string;
  GHOST_DRIVE_API: string;
}
