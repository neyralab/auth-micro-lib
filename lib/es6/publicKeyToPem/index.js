"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyToPem = void 0;
const forge = require("node-forge");
const publicKeyToPem = ({ publicKey }) => {
    try {
        return forge.pki.publicKeyToPem(publicKey);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.publicKeyToPem = publicKeyToPem;
