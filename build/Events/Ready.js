"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
let logTime = new Date().toLocaleTimeString('en-us', { timeZone: 'America/New_York' });
let logDate = new Date().toLocaleDateString();
main_1.Metis.client.on('ready', async () => {
    main_1.Metis.client.editStatus('online', { name: `!help | ${main_1.Metis.client.guilds.size} guilds`, type: 0 });
    main_1.Metis.client.executeWebhook('1043789410006740995', config.readyWebhook, {
        embeds: [{
                color: main_1.Metis.colors.green,
                description: `\`${logDate}  ${logTime}\` <@!${main_1.Metis.client.user.id}> [ALL SHARDS READY]`
            }]
    });
    main_1.Metis.logger.success('Metis', `All ${main_1.Metis.client.shards.size} Shards Connected`, 'Shard Manager');
});
