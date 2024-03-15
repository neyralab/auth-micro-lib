"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRSAKeys = void 0;
const tslib_1 = require("tslib");
const forge = require("node-forge");
const getUserRSAKeys = function ({ signer }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const msg = "Welcome to GhostDrive! \n\nPlease sign to start using this for encryption with Ghostdrive. \n" +
            "This will not trigger a blockchain transaction or cost any gas fees. \n\n" +
            "What's happening?\n" +
            "A public key will be registered with this address and \n" +
            "used only for data encryption.";
        const rnd = yield signer.signMessage(msg);
        const prng = forge.random.createInstance();
        prng.seedFileSync = function (needed) {
            let outputString = "";
            while (outputString.length < needed) {
                outputString += rnd;
            }
            return outputString.slice(0, needed);
        };
        return forge.pki.rsa.generateKeyPair({ bits: 2048, prng });
    });
};
exports.getUserRSAKeys = getUserRSAKeys;
