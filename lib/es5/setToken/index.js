"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
var ramda_1 = require("ramda");
var setToCookies = function (token, type) {
    if (token.length > 4096) {
        throw new Error('Token length exceeds maximum allowed.');
    }
    var options = {
        path: '/',
    };
    token = encodeURIComponent(token);
    document.cookie = "".concat(type, "=").concat(token, "; ").concat(Object.entries(options)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    })
        .join('; '));
};
var setToken = function (res, access_token, refresh_token) {
    var token = (0, ramda_1.path)(['data', 'access_token'], res) || '';
    var refreshToken = (0, ramda_1.path)(['data', 'refresh_token'], res) || '';
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
