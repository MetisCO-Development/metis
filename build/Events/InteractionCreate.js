"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const main_1 = require("../main");
const config = require('../../config.json');
main_1.Metis.client.on('interactionCreate', async (interaction) => {
    if (interaction instanceof eris_1.CommandInteraction) {
        switch (interaction.data.name) {
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
        }
    }
});
