"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
let logTime = new Date().toLocaleTimeString('en-us', { timeZone: 'America/New_York' });
let logDate = new Date().toLocaleDateString();
main_1.Metis.client.on('ready', async () => {
    main_1.Metis.client.editStatus('online', { name: `!help | ${main_1.Metis.client.guilds.size} guilds`, type: 0 });
    main_1.Metis.client.createGuildCommand(config.homeServer, {
        name: 'ping',
        description: 'Pings the bot',
        type: 1,
        defaultPermission: true
    });
    // metis.client.createCommand({
    //     name: 'ping', 
    //     description: 'Pings the bot.', 
    //     type: 1, 
    //     defaultPermission: true
    // })
    main_1.Metis.client.createGuildCommand(config.homeServer, {
        name: 'eval',
        description: 'Evaluates code.',
        type: 1,
        defaultPermission: true,
        options: [
            {
                name: 'code',
                description: 'The code to evaluate.',
                type: 3,
                required: true
            }
        ]
    });
    main_1.Metis.logger.success('Metis', `${main_1.Metis.client.shards.size} Shards Connected [ALL]`, 'Shard Manager');
});
