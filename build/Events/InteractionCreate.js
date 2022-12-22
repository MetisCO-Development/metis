"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const main_1 = require("../main");
const config = require('../../config.json');
const util_1 = require("util");
main_1.Metis.client.on('interactionCreate', async (interaction, args) => {
    if (interaction instanceof eris_1.CommandInteraction) {
        switch (interaction.data.name) {
            // ping command
            case "ping":
                let now = Date.now();
                let ping = {
                    embeds: [{
                            color: main_1.Metis.colors.blue,
                            description: `${main_1.Metis.emotes.info} Ping?`
                        }]
                };
                await interaction.createMessage(ping).then(() => {
                    return interaction.editOriginalMessage({
                        embeds: [{
                                color: main_1.Metis.colors.blue,
                                description: `${main_1.Metis.emotes.info} Ping! \`${Date.now() - now}ms\``
                            }]
                    });
                });
            case "eval":
                if (!main_1.Metis.developer.includes(interaction.user.id)) {
                    return;
                }
                let msgArray = [];
                const code = args.join(" ");
                let evaled = await eval(code);
                if (typeof evaled !== "string")
                    evaled = (0, util_1.inspect)(evaled, { depth: 0 });
                msgArray = msgArray.concat(main_1.Metis.util.splitMessage(evaled, 1990));
                for (const msg of msgArray) {
                    interaction.channel.createMessage({
                        embed: {
                            author: { name: 'Eval Results', icon_url: interaction.user.avatarURL },
                            description: "```js\n" + evaled + "```",
                            color: main_1.Metis.colors.blue,
                            timestamp: new Date(),
                        }
                    }).catch((err) => {
                        interaction.channel.createMessage({
                            embed: {
                                author: { name: 'Eval Results', icon_url: interaction.user.avatarURL },
                                description: "```js\n" + err + "```",
                                color: main_1.Metis.colors.blue,
                                timestamp: new Date(),
                            }
                        });
                    });
                }
            // new commands
        }
    }
});
