"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const globalSchema = new mongoose_1.Schema({
    blacklistedUsers: [{
            username: String,
            userId: String,
            reason: String,
            date: String,
        }],
    blacklistedServers: [{
            guild: String,
            guildId: String,
            reason: String,
            date: String,
            owner: String,
            ownerId: String
        }]
});
exports.default = (0, mongoose_1.model)('global', globalSchema, 'globalDB');
