"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetisClient = void 0;
const eris_1 = require("eris");
class MetisClient extends eris_1.Client {
    super(options, token) {
        this.options = options;
        this.token = token;
    }
    async getUser(userID) {
        let user;
        if (!Number(userID)) {
            return;
        }
        user = this.users.get(userID);
        if (!user) {
            user = await this.getRESTUser(userID);
        }
        return user;
    }
    async getMember(guildID, userID) {
        let member;
        let guild;
        if (!Number(guildID)) {
            return;
        }
        if (!Number(userID)) {
            return;
        }
        guild = this.guilds.get(guildID);
        if (!guild) {
            return;
        }
        member = guild.members.get(userID);
        if (!member) {
            member = await this.getRESTGuildMember(guildID, userID);
        }
        return member;
    }
    async getGuild(guildID) {
        let guild;
        if (!Number(guildID)) {
            return;
        }
        guild = this.guilds.get(guildID);
        return guild;
    }
}
exports.MetisClient = MetisClient;
