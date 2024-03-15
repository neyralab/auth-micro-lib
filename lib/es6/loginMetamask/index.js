"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMetamask = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const ethers_1 = require("ethers");
const index_js_1 = require("../getUserRSAKeys/index.js");
const index_js_2 = require("../publicKeyToPem/index.js");
const index_js_3 = require("../setToken/index.js");
const loginMetamask = ({ publicAddress, signature, NEYRA_AI_API, API_PUB_KEY_SAVE }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${NEYRA_AI_API}/auth/identity/connect_userv8`, {
            publicAddress,
            provider: 'walletconnect',
            signature,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const access_token = response.data.data.access_token;
        const refresh_token = response.data.data.refresh_token;
        const currentProvider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        const signer = currentProvider.getSigner();
        (0, index_js_1.getUserRSAKeys)({ signer }).then((keys) => {
            const pem = (0, index_js_2.publicKeyToPem)({ publicKey: keys.publicKey });
            const body = { publicAddress, publicKey: pem };
            const headers = { 'X-Token': `Bearer ${access_token}` };
            return axios_1.default.post(API_PUB_KEY_SAVE, body, {
                headers,
            });
        });
        (0, index_js_3.setToken)(response, access_token, refresh_token);
    }
    catch (err) {
        throw err;
    }
});
exports.loginMetamask = loginMetamask;
