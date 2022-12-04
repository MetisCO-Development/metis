"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const guildSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    guildName: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        default: '!'
    },
    messageLogChannel: {
        type: String,
        default: ''
    },
    modLogChannel: {
        type: String,
        default: ''
    },
    serverLogChannel: {
        type: String,
        default: ''
    },
    otherLogChannel: {
        type: String,
        default: ''
    },
    welcomeChannel: {
        type: String,
        default: ''
    },
    botCommander: {
        type: Array,
        default: []
    },
    modRoles: {
        type: Array,
        default: []
    },
    tags: [{
            name: String,
            content: String,
            createdBy: String,
            timestamp: String
        }],
    warnings: [{
            _id: mongoose_1.Schema.Types.ObjectId,
            userId: String,
            username: String,
            moderatorID: String,
            moderatorUsername: String,
            reason: String,
            time: String
        }],
    moderations: [{
            _id: mongoose_1.Schema.Types.ObjectId,
            type: String,
            userId: String,
            username: String,
            moderatorID: String,
            moderatorUsername: String,
            duration: String,
            reason: String,
            time: String
        }]
});
module.exports = (0, mongoose_1.model)('Guild', guildSchema, 'guilds');
