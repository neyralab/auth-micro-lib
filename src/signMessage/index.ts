import { ethers } from 'ethers';
import { ISignMessage } from '../types/index.js';

export const signMessage = async ({
  message,
  publicAddress,
  signMessageAsync,
  provider,
}: ISignMessage): Promise<`0x${string}` | string> => {
  if (signMessageAsync) {
    return signMessageAsync({ account: publicAddress, message });
  } else {
    const currentProvider = new ethers.providers.Web3Provider(provider ?? window.ethereum);
    const signer = currentProvider.getSigner();
    return signer.signMessage(message);
  }
};
