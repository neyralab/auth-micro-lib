"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMetamask = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var index_js_1 = require("../getUserRSAKeys/index.js");
var index_js_2 = require("../publicKeyToPem/index.js");
var index_js_3 = require("../setToken/index.js");
var loginMetamask = function (_a) {
    var publicAddress = _a.publicAddress, signature = _a.signature, NEYRA_AI_API = _a.NEYRA_AI_API, API_PUB_KEY_SAVE = _a.API_PUB_KEY_SAVE;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, access_token_1, refresh_token, currentProvider, signer, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.put("".concat(NEYRA_AI_API, "/auth/identity/connect_userv8"), {
                            publicAddress: publicAddress,
                            provider: 'walletconnect',
                            signature: signature,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 1:
                    response = _b.sent();
                    access_token_1 = response.data.data.access_token;
                    refresh_token = response.data.data.refresh_token;
                    currentProvider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                    signer = currentProvider.getSigner();
                    (0, index_js_1.getUserRSAKeys)({ signer: signer }).then(function (keys) {
                        var pem = (0, index_js_2.publicKeyToPem)({ publicKey: keys.publicKey });
                        var body = { publicAddress: publicAddress, publicKey: pem };
                        var headers = { 'X-Token': "Bearer ".concat(access_token_1) };
                        return axios_1.default.post(API_PUB_KEY_SAVE, body, {
                            headers: headers,
                        });
                    });
                    (0, index_js_3.setToken)(response, access_token_1, refresh_token);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.loginMetamask = loginMetamask;
