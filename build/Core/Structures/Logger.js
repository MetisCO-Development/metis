"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const signale_1 = __importDefault(require("signale"));
class Logger {
    info(name, message, subprefix) {
        if (name.length > 50) {
            return "Name value exceeds 50 characters";
        }
        if (subprefix) {
            message = `[${subprefix}] ${message}`;
        }
        signale_1.default.info({ prefix: `[${name}]`, message: message });
    }
    success(name, message, subprefix) {
        if (name.length > 50) {
            return "Name value exceeds 50 characters";
        }
        if (subprefix) {
            message = `[${subprefix}] ${message}`;
        }
        signale_1.default.success({ prefix: `[${name}]`, message: message });
    }
    warn(name, message, subprefix) {
        if (name.length > 50) {
            return "Name value exceeds 50 characters";
        }
        if (subprefix) {
            message = `[${subprefix}] ${message}`;
        }
        signale_1.default.warn({ prefix: `[${name}]`, message: message });
    }
    error(name, message, subprefix) {
        if (name.length > 50) {
            return "Name value exceeds 50 characters";
        }
        if (subprefix) {
            message = `[${subprefix}] ${message}`;
        }
        signale_1.default.error({ prefix: `[${name}]`, message: message });
    }
    fatal(name, message, subprefix) {
        if (name.length > 50) {
            return "Name value exceeds 50 characters";
        }
        if (subprefix) {
            message = `[${subprefix}] ${message}`;
        }
        signale_1.default.fatal({ prefix: `[${name}]`, message: message });
    }
}
exports.Logger = Logger;
