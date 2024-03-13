'use client';
import React, { ReactNode } from 'react';
import { mainnet, sepolia } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider, cookieStorage, createStorage } from 'wagmi';

interface Web3ModalProviderProps {
  children: ReactNode;
  initialState?: State;
  projectId: string;
  metadata: {
    name: string;
    description: string;
    url: string;
    icons: string[];
  };
}

const queryClient = new QueryClient();

const chains = [mainnet, sepolia] as const;

const Web3ModalProvider = ({ children, initialState, projectId, metadata }: Web3ModalProviderProps): JSX.Element => {
  const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
  });

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3ModalProvider;
