import { ethers } from 'ethers';

import { IWeb3NeyraAuth } from '../types';
import { loginMetamask } from '../loginMetamask';
import { loginUnstoppableEffect } from '../loginUnstoppableEffect';
import { getUserRSAKeys } from '../getUserRSAKeys';
import { publicKeyToPem } from '../publicKeyToPem';

// variant - 2
export const web3NeyraAuth = async ({
  authToken,
  refreshToken,
  history,
  dispatch,
  redirectUrl,
  subdomain,
  API_SIGN_IN_METAMASK,
  handleMetamaskLogin,
  savePubKey,
  errorMessages,
  handleSignUp,
  searchParams,
  setSignatureError,
  setIsConnecting,
  addNotification,
  REACT_APP_UNSTOPPABLE_CLIENT_ID,
  API_AUTH,
  setToken,
  SIGN_IN_ERROR_MESSAGES,
  account,
  wallet,
  disconnect,
  connect,
  signMessage,
}: IWeb3NeyraAuth) => {
  console.log('web3NeyraAuth', { authToken, refreshToken });
  if (wallet) {
    disconnect(wallet);
  } else {
    console.log('start connect')
    connect().then(async (res) => {
      console.log('start connect',res)
      if (res.length) {
        const provider = res[0].provider;
        const label = res[0].label;
        const currentAccount = res[0].accounts[0].address;
        console.log(provider,currentAccount,label)
        const sig = await signMessage(setSignatureError, provider).then(
          (res) => res.signature
        );
        if (
          (sig && label === 'MetaMask') ||
          label === 'Coinbase Wallet' ||
          label === 'WalletConnect'
        ) {
          console.log(label)
          loginMetamask({
            publicAddress: currentAccount || window.ethereum.selectedAddress,
            signature: sig,
            history,
            dispatch,
            slug: subdomain,
            redirectUrl,
            API_SIGN_IN_METAMASK,
            handleMetamaskLogin,
          })
            .then((res) => {
              if (!res.data.public_key || res.data.public_key.length === 0) {
                const currentProvider = new ethers.providers.Web3Provider(
                  provider ?? window.ethereum
                );
                const signer = currentProvider.getSigner();
                getUserRSAKeys({ signer }).then((keys) => {
                  savePubKey(
                    currentAccount || window.ethereum.selectedAddress,
                    publicKeyToPem({ publicKey: keys.publicKey })
                  );
                });
              }
            })
            .catch((error) => {
              if (errorMessages.unregistered === error.message) {
                if (
                  label === 'MetaMask' ||
                  label === 'Coinbase Wallet' ||
                  label === 'WalletConnect'
                ) {
                  const is_coinbase = label === 'Coinbase Wallet';
                  handleSignUp(
                    is_coinbase,
                    searchParams,
                    currentAccount,
                    provider,
                    setSignatureError,
                    dispatch,
                    redirectUrl,
                    setIsConnecting,
                    history
                  );
                }

                if (sig && label === 'Unstoppable') {
                  loginUnstoppableEffect({
                    history,
                    redirectUrl,
                    REACT_APP_UNSTOPPABLE_CLIENT_ID,
                    API_AUTH,
                    setToken,
                  });
                }
              } else if (
                error.message === SIGN_IN_ERROR_MESSAGES.NO_WORKSPACE
              ) {
                history.push({
                  pathname: '/no-workspace',
                  state: { account },
                });
              } else {
                addNotification(error.message, 'error');
              }
            });
        }
        if (sig && label === 'Unstoppable') {
          loginUnstoppableEffect({
            history,
            redirectUrl,
            REACT_APP_UNSTOPPABLE_CLIENT_ID,
            API_AUTH,
            setToken,
          });
        }
      }
    });
  }
};
// variant - 1
// export const web3NeyraAuth = async ({
//   authToken,
//   refreshToken,
//   state,
//   label,
//   history,
//   provider,
//   currentAccount,
//   dispatch,
//   redirectUrl,
//   subdomain,
//   API_SIGN_IN_METAMASK,
//   handleMetamaskLogin,
//   savePubKey,
//   errorMessages,
//   handleSignUp,
//   searchParams,
//   setSignatureError,
//   setIsConnecting,
//   addNotification,
//   REACT_APP_UNSTOPPABLE_CLIENT_ID,
//   API_AUTH,
//   setToken,
//   SIGN_IN_ERROR_MESSAGES,
//   account,
// }: IWeb3NeyraAuth) => {
//   console.log('web3NeyraAuth', { authToken, refreshToken });
//   if (
//     (state.signature && label === 'MetaMask') ||
//     label === 'Coinbase Wallet' ||
//     label === 'WalletConnect'
//   ) {
//     const { signature } = state;
//     loginMetamask({
//       publicAddress: currentAccount || window.ethereum.selectedAddress,
//       signature,
//       history,
//       dispatch,
//       slug: subdomain,
//       redirectUrl,
//       API_SIGN_IN_METAMASK,
//       handleMetamaskLogin,
//     })
//       .then((res) => {
//         if (!res.data.public_key || res.data.public_key.length === 0) {
//           const currentProvider = new ethers.providers.Web3Provider(
//             provider ?? window.ethereum
//           );
//           const signer = currentProvider.getSigner();
//           getUserRSAKeys({ signer }).then((keys) => {
//             savePubKey(
//               currentAccount || window.ethereum.selectedAddress,
//               publicKeyToPem({ publicKey: keys.publicKey })
//             );
//           });
//         }
//       })
//       .catch((error) => {
//         if (errorMessages.unregistered === error.message) {
//           if (
//             label === 'MetaMask' ||
//             label === 'Coinbase Wallet' ||
//             label === 'WalletConnect'
//           ) {
//             const is_coinbase = label === 'Coinbase Wallet';
//             handleSignUp(
//               is_coinbase,
//               searchParams,
//               currentAccount,
//               provider,
//               setSignatureError,
//               dispatch,
//               redirectUrl,
//               setIsConnecting,
//               history
//             );
//           }
//           // @ts-ignore
//           if (state.signature && label === 'Unstoppable') {
//             loginUnstoppableEffect({
//               history,
//               redirectUrl,
//               REACT_APP_UNSTOPPABLE_CLIENT_ID,
//               API_AUTH,
//               setToken,
//             });
//           }
//         } else if (error.message === SIGN_IN_ERROR_MESSAGES.NO_WORKSPACE) {
//           history.push({
//             pathname: '/no-workspace',
//             state: { account },
//           });
//         } else {
//           addNotification(error.message, 'error');
//         }
//       });
//   }
//   if (state.signature && label === 'Unstoppable') {
//     loginUnstoppableEffect({
//       history,
//       redirectUrl,
//       REACT_APP_UNSTOPPABLE_CLIENT_ID,
//       API_AUTH,
//       setToken,
//     });
//   }
// };
