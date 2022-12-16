"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Ping extends Command_1.Command {
    constructor() {
        super({
            name: 'ping',
            description: 'Displays current bot latency.',
            usage: '',
            example: '',
            permLevel: types_1.CommandPermissions['user'],
            requiredUsers: [],
            requiredGuilds: [],
            deleteOnUsage: false,
            showOnHelp: true,
            enabled: true,
            aliases: ['pong']
        });
    }
    async execute(metis, ctx) {
        const originalTime = Date.now();
        return ctx.channel.createMessage({
            embed: {
                description: `${metis.emotes.info} Pong!`,
                color: metis.colors.default
            }
        }).then(message => {
            return message.edit({
                embed: {
                    description: `${metis.emotes.info} Pong! \`${Date.now() - originalTime}ms\``,
                    color: metis.colors.default
                }
            });
        }).catch((error) => { });
    }
}
module.exports.cmd = Ping;
