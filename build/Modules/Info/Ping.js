"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const eris_1 = require("eris");
class Ping extends Command_1.Command {
    constructor() {
        super({
            name: 'ping',
            module: 'Info',
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
        metis.client.on('interactionCreate', async (interaction) => {
            if (interaction instanceof eris_1.CommandInteraction) {
                switch (interaction.data.name) {
                    case "ping":
                        let now = Date.now();
                        let ping = {
                            embeds: [{
                                    color: metis.colors.blue,
                                    description: `${metis.emotes.info} Ping?`
                                }]
                        };
                        await interaction.createMessage(ping).then(() => {
                            return interaction.editOriginalMessage({
                                embeds: [{
                                        color: metis.colors.blue,
                                        description: `${metis.emotes.info} Ping! \`${Date.now() - now}ms\``
                                    }]
                            });
                        });
                }
            }
        });
        const originalTime = Date.now();
        return ctx.channel.createMessage({
            embed: {
                description: `${metis.emotes.info} Ping?`,
                color: metis.colors.blue
            }
        }).then(message => {
            return message.edit({
                embed: {
                    description: `${metis.emotes.info} Pong! \`${Date.now() - originalTime}ms\``,
                    color: metis.colors.blue
                }
            });
        });
    }
}
module.exports.cmd = Ping;
