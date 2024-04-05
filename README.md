### USAGE EXAMPLE

## How to login via metamask

You can use code bellow to get signature and publicAddress

```javascript

  const message = 'Welcome to Neyra Network. Your ID for this signature request is';
    const provider = new ethers.providers.Web3Provider(
      currentProvider ?? window.ethereum
    );
    const signer = provider.getSigner();
    const publicAddress = await signer.getAddress();

    const nonce = withNonce ? await getNonceEffect(publicAddress) : '';

    const normalizedMessage = withNonce ? `${message}: ${nonce}` : message;
    const signature = await signer.signMessage(normalizedMessage);

```


```javascript
loginMetamask({publicAddress,
  signature,
  NEYRA_AI_API,API_PUB_KEY_SAVE}) 
```

1. If you want to login via Metamask

Accepts:

1. publicAddress - your account's public address
2. signature - Metamask signature
3. NEYRA_AI_API - neira url
4. API_PUB_KEY_SAVE - ghost url
