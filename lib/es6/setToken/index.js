"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
const ramda_1 = require("ramda");
const setToCookies = (token, type) => {
    if (token.length > 4096) {
        throw new Error('Token length exceeds maximum allowed.');
    }
    const options = {
        path: '/',
    };
    token = encodeURIComponent(token);
    document.cookie = `${type}=${token}; ${Object.entries(options)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')}`;
};
const setToken = (res, access_token, refresh_token) => {
    const token = (0, ramda_1.path)(['data', 'access_token'], res) || '';
    const refreshToken = (0, ramda_1.path)(['data', 'refresh_token'], res) || '';
    if (access_token) {
        setToCookies(access_token, 'access_token');
    }
    if (refresh_token) {
        setToCookies(refresh_token, 'refresh_token');
    }
    if (token) {
        setToCookies(token, 'access_token');
    }
    if (refreshToken) {
        setToCookies(refreshToken, 'refresh_token');
    }
};
exports.setToken = setToken;
