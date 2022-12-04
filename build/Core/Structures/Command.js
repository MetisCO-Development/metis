"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(data) {
        this.name = data.name || 'unnamed';
        this.aliases = data.aliases || [];
        this.id = data.name;
        this.requiredGuilds = data.requiredGuilds || [];
        this.requiredRoles = data.requiredRoles || [];
        this.requiredUsers = data.requiredUsers || [];
        this.helpInfo = data.helpInfo || 'someone waz lazy *yawn*';
        this.helpUsage = data.helpUsage;
        this.commandType = data.commandType || 'default';
    }
    async execute(metis, ctx) {
        return 'Unimplemented';
    }
}
exports.Command = Command;
