"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        unique: true,
        index: true
    },
    username: String,
    isBlacklisted: {
        type: Boolean,
        default: false,
    },
    ownedGuilds: Array
});
exports.default = (0, mongoose_1.model)('user', userSchema, 'users');
