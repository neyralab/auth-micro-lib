'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var chains_1 = require("wagmi/chains");
var react_2 = require("@web3modal/wagmi/react");
var config_1 = require("@web3modal/wagmi/react/config");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var queryClient = new react_query_1.QueryClient();
var chains = [chains_1.mainnet, chains_1.sepolia];
var Web3ModalProvider = function (_a) {
    var children = _a.children, initialState = _a.initialState, projectId = _a.projectId, metadata = _a.metadata;
    var config = (0, config_1.defaultWagmiConfig)({
        chains: chains,
        projectId: projectId,
        metadata: metadata,
        ssr: true,
        storage: (0, wagmi_1.createStorage)({
            storage: wagmi_1.cookieStorage,
        }),
    });
    (0, react_2.createWeb3Modal)({
        wagmiConfig: config,
        projectId: projectId,
        enableAnalytics: true,
        enableOnramp: true,
    });
    return (react_1.default.createElement(wagmi_1.WagmiProvider, { config: config, initialState: initialState },
        react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
};
exports.default = Web3ModalProvider;
