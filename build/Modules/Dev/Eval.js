"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const util_1 = require("util");
class Eval extends Command_1.Command {
    constructor() {
        super({
            name: 'eval',
            module: 'Dev',
            description: 'Evaluates code.',
            usage: '<code>',
            example: 'metis.guilds.size',
            permLevel: types_1.CommandPermissions['developer'],
            requiredGuilds: [],
            requiredUsers: [],
            showOnHelp: false,
            deleteOnUsage: false,
            aliases: ['evaluate', 'runcodefortheboys', 'e']
        });
    }
    async execute(metis, ctx) {
        let msgArray = [];
        const code = ctx.args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string")
            evaled = (0, util_1.inspect)(evaled, { depth: 0 });
        msgArray = msgArray.concat(metis.util.splitMessage(evaled, 1990));
        for (const msg of msgArray) {
            ctx.channel.createMessage({
                embed: {
                    author: { name: 'Eval Results', icon_url: ctx.user.avatarURL },
                    description: metis.util.formatCode(msg.toString()),
                    color: metis.colors.blue,
                    timestamp: new Date(),
                }
            }).catch((err) => {
                ctx.channel.createMessage({
                    embed: {
                        author: { name: 'Eval Results', icon_url: ctx.user.avatarURL },
                        description: metis.util.formatCode(msg.toString()),
                        color: metis.colors.blue,
                        timestamp: new Date(),
                    }
                });
            });
        }
    }
}
module.exports.cmd = Eval;
