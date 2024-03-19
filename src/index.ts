//@ts-ignore
export { loginMetamask } from './loginMetamask/index.ts';
//@ts-ignore
export { loginEmail } from './loginEmail/index.ts';
//@ts-ignore
export { default as Web3ModalProvider } from './walletConnect/Web3ModalProvider.tsx';
export { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/wagmi/react';
export { useAccount, useDisconnect, useSignMessage } from 'wagmi';
