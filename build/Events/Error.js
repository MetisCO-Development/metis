"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
let logTime = new Date().toLocaleTimeString('en-us', { timeZone: 'America/New_York' });
let logDate = new Date().toLocaleDateString();
main_1.Metis.client.on('error', async (err, id) => {
    main_1.Metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, {
        embeds: [{
                color: main_1.Metis.colors.red,
                description: `\`${logDate}  ${logTime}\` <@!${main_1.Metis.client.user.id}> [ERROR] Shard: \`${id}\`\n${err}`
            }]
    });
});
