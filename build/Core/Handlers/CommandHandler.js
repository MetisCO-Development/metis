"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const types_1 = require("../../types");
class CommandHandler {
    constructor(handler) {
        this.client = handler.client;
        this.member = handler.member;
        this.guild = handler.guild;
    }
    async runCommand(metis, ctx) {
        ctx.command.execute(metis, ctx);
        if (ctx.command.deleteOnUsage) {
            return ctx.msg.delete().catch((error) => { });
        }
        if (!ctx.command.deleteOnUsage) {
            return;
        }
    }
    async handleCommand(metis, ctx) {
        const requiredUsers = ctx.command.requiredUsers;
        const requiredGuilds = ctx.command.requiredGuilds;
        if (requiredUsers.length && requiredUsers.includes(this.member.id)) {
            return this.runCommand(metis, ctx);
        }
        if (requiredGuilds.length && !requiredGuilds.includes(this.guild.id)) {
            return;
        }
        if (ctx.command.permLevel === types_1.CommandPermissions["user"]) {
            return this.runCommand(metis, ctx);
        }
        if (ctx.command.permLevel === types_1.CommandPermissions["serverModerator"] && !(this.member.permissions.has('manageGuild') ||
            this.member.roles.some((role) => ctx.guildDatabase.modRoles.includes(role)))) {
            return;
        }
        if (ctx.command.permLevel === types_1.CommandPermissions["serverManager"] && !this.member.permissions.has('manageGuild')) {
            return;
        }
        if (ctx.command.permLevel === types_1.CommandPermissions["supportStaff"] && !metis.staff.includes(this.member.id)) {
            return;
        }
        if (ctx.command.permLevel === types_1.CommandPermissions["developer"] && !metis.developer.includes(this.member.id)) {
            return;
        }
        return this.runCommand(metis, ctx);
    }
}
exports.CommandHandler = CommandHandler;
