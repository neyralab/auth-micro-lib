"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmail = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const index_js_1 = require("../setToken/index.js");
const loginEmail = ({ NEIRA_AI_API, name, password, email }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${NEIRA_AI_API}/auth/identity/connect_userv8`, {
            provider: 'email',
            first_name: name,
            password,
            email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.data) {
            const access_token = response.data.data.access_token;
            const refresh_token = response.data.data.refresh_token;
            (0, index_js_1.setToken)(response, access_token, refresh_token);
            return response.data;
        }
        else {
            throw new Error(response.data);
        }
    }
    catch (error) {
        throw error;
    }
});
exports.loginEmail = loginEmail;
