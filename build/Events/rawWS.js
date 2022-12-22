"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const main_1 = require("../main");
main_1.Metis.client.on("rawWS", async (packet) => {
    if (packet.t === "INTERACTION_CREATE") {
        const data = packet.d;
        const interaction = new eris_1.Interaction(data, config.token, main_1.Metis.client.user.id);
        if (interaction.command.name === "say") {
            await interaction.reply(interaction.command.options[0].value);
        }
    }
});
