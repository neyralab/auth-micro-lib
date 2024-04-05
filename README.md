### USAGE EXAMPLE

## How to login via Web3 wallet

```javascript
loginWeb3({
  publicAddress,
  NEYRA_AI_API,
  GHOST_DRIVE_API,
  signMessageAsync,
  provider,
  autoRedirect,
});
```

Accepts:

1. publicAddress - your account's public address
2. NEYRA_AI_API - Neyra URL
3. GHOST_DRIVE_API - Ghost URL
4. signMessageAsync - (Optional) Used with the Wagmi library.
5. provider - (Optional) Web3 provider.
6. autoRedirect - (Optional) A field indicating whether to automatically redirect the user to the default route after a successful connection.

## How to login via Telegram

```javascript
loginTelegram({ telegramResponse, NEYRA_AI_API });
```

Accepts:

1. telegramResponse - Telegram response object containing necessary authentication details.
2. NEYRA_AI_API - Neyra URL.

## How to login via Google

```javascript
loginGoogle({ credential, NEYRA_AI_API });
```

Accepts:

1.  credential - Google credential object containing necessary authentication details.
2.  NEYRA_AI_API - Neyra URL.
