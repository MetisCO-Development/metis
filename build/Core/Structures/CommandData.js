"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandData = void 0;
class CommandData {
    constructor(data) {
        this.msg = data.msg;
        this.args = data.args;
        this.member = data.member;
        this.user = data.user;
        this.channel = data.channel;
        this.dmChannel = data.dmChannel;
        this.guild = data.guild;
        this.command = data.command;
        this.guildDatabase = data.guildDatabase;
        this.userDatabase = data.userDatabase;
    }
}
exports.CommandData = CommandData;
