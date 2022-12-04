"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: String,
    username: String,
    isBlacklisted: Boolean,
    ownedGuilds: [{
            guildId: String,
            guildName: String,
        }]
});
module.exports = (0, mongoose_1.model)('User', userSchema, 'users');
