'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const chains_1 = require("wagmi/chains");
const react_2 = require("@web3modal/wagmi/react");
const config_1 = require("@web3modal/wagmi/react/config");
const react_query_1 = require("@tanstack/react-query");
const wagmi_1 = require("wagmi");
const queryClient = new react_query_1.QueryClient();
const chains = [chains_1.mainnet, chains_1.sepolia];
const Web3ModalProvider = ({ children, initialState, projectId, metadata }) => {
    const config = (0, config_1.defaultWagmiConfig)({
        chains,
        projectId,
        metadata,
        ssr: true,
        storage: (0, wagmi_1.createStorage)({
            storage: wagmi_1.cookieStorage,
        }),
    });
    (0, react_2.createWeb3Modal)({
        wagmiConfig: config,
        projectId,
        enableAnalytics: true,
        enableOnramp: true,
    });
    return (react_1.default.createElement(wagmi_1.WagmiProvider, { config: config, initialState: initialState },
        react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
};
exports.default = Web3ModalProvider;
