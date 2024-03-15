"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUnstoppableEffect = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const js_1 = require("@uauth/js");
const loginUnstoppableEffect = ({ history, redirectUrl, REACT_APP_UNSTOPPABLE_CLIENT_ID, API_AUTH, setToken, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uauth = new js_1.default({
            clientID: REACT_APP_UNSTOPPABLE_CLIENT_ID,
            redirectUri: window.location.origin,
        });
        const authorization = yield uauth.loginWithPopup();
        const { wallet_address } = authorization.idToken || {};
        // @ts-ignore
        const { message, signature } = Object.values((_a = authorization === null || authorization === void 0 ? void 0 : authorization.idToken) === null || _a === void 0 ? void 0 : _a.proof)[0];
        const login = yield axios_1.default.post(`${API_AUTH}/login_check_unstoppable`, {
            publicAddress: wallet_address,
            message,
            signature,
        });
        setToken(login);
        history.push(redirectUrl);
    }
    catch (error) {
        throw error;
    }
});
exports.loginUnstoppableEffect = loginUnstoppableEffect;
