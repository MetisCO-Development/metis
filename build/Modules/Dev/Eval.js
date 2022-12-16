"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const util_1 = require("util");
class Eval extends Command_1.Command {
    constructor() {
        super({
            name: 'eval',
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
        let output;
        if (!output) {
            output = undefined;
        }
        try {
            output = await eval(ctx.args.join(' '));
            output = (0, util_1.inspect)(output, { depth: 0 });
        }
        catch (error) {
            output = error;
        }
        msgArray = msgArray.concat(metis.util.splitMessage(output, 1990));
        for (const msg of msgArray) {
            ctx.channel.createMessage({
                embed: {
                    color: metis.colors.default,
                    author: {
                        name: 'Eval Results',
                        icon_url: ctx.member.avatarURL
                    },
                    timestamp: new Date(),
                    description: metis.util.formatCode(msg.toString().replace(metis.client.token, '[]'))
                }
            });
        }
    }
}
module.exports.cmd = Eval;
